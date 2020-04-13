# 問題
あなたはウェブアプリを保守する保守SEです。

とある午後、コーディングをしていると後輩社員が恐る恐る話しかけてきます。

「・・・す、すみません、先輩・・・。あの・・・、ちょっと見てもらいたいんですけど・・・。」

後輩の態度から何か良くないことが起きていることが感じ取り、おそるおそる聞き返すあなた。

「・・・え、ど、どうしたの・・・？」

「・・・あ、あの、この前、先輩から教えてもらったSQLを練習しようと、本番環境で練習していたんですけど、間違えてDELETE文を発行して全部のデータを消してしまったみたいなんです・・・。見間違いかもと思い、SELECTしても0件と表示されるのでやっぱり消えてしまったみたいで・・・。も、戻す方法とかあったりしないですよね・・・。」

半分泣きながら後輩が言い終えるのと同時に、サーっと全身から血の気が引く音が聞こえるあなた。

(あれほど本番環境で練習してはいけないと言ったはずなのに・・・)

なんてことを今さら言っても後の祭りである。

(本番データを全部消してしまったのが本当なら、どれだけの損害になるのかわからない・・・。あぁ、上司にどうやって説明しよう・・・、いや、上司どころじゃなくて社長に説明しないといけないのでは・・・。・・・説明する前にクビかな・・・)

カラカラとなったノドの奥からかろうじて声を絞り出す。

「と、とりあえずどういう状況か確認させて・・・。後輩くんのターミナルを見てみようか・・・。」

フラフラとした足取りで後輩の席に向かいターミナルを覗き込むあなた・・・。

さて、削除されてしまったデータを無事に復活させることができるだろうか？

## 再現方法
以下のコマンドを実行することで、後輩がDELETE文を実行し、SELECT文で削除されたことを確認したところまでをDockerコンテナー上に再現できます。

```shell
# データの入ったPostgreSQLを起動する
docker run --name mypostgres -d -e POSTGRES_PASSWORD=postgres shoheihagiwara/delete-all-by-mistake

# 接続
docker exec -it mypostgres psql postgres postgres

# 後輩がDELETEして、SELECTした状態を再現
select count(*) from machines;
delete from machines;
select count(*) from machines;

# ・・・ここから調査を開始する・・・

# 終わったらコンテナを削除するのを忘れない
\q
docker rm --force mypostgres
```

# 解説
<details>
<summary>解説を見る</summary>

<p>

## 概要
これは僕が実際に本番環境のデータをDELETEしてしまった経験をもとにしています。
おそらく、IT業界で働いている人であれば、誤って本番データを消してしまうという経験が少なからずあるのではないでしょうか。

このタスクでは、そのようなヤバい経験を味わってもらえるようにしてみました。

ぜひ、このタスクを通してヤバい雰囲気を感じ取ってもらい、同じような間違いを起こさないようにしてもらえればと思います。

## 暫定対応
実は今回のタスクでは`rollback`をすること、または`\q`でセッションを閉じることでデータが元に戻ります。

psqlの結果を注意深く見てみると、AUTOCOMMITがoffになっていることがわかります。
以下の★部分です。

```sql
shohei@shohei-ubuntu ~> docker exec -it mypostgres psql postgres postgres

Null display is "(null)".
AUTOCOMMIT is off ★
psql (9.6.17)
Type "help" for help.

postgres=#
```

AUTOCOMMITがoffの状態では、明示的に`commit`を発行しない限りDELETEなどの変更は反映されません。

なので、`rollback`か`\q`してしまえば変更前のデータが復活します。
実際に実行してみると、以下のようにデータが戻っていることが確認できます。

```sql
shohei@shohei-ubuntu ~> docker exec -it mypostgres psql postgres postgres

Null display is "(null)".
AUTOCOMMIT is off
psql (9.6.17)
Type "help" for help.

postgres=# select count(*) from machines;
 count
-------
   150
(1 row)

postgres=# delete from machines;
DELETE 150
postgres=# select count(*) from machines;
 count
-------
     0
(1 row)

postgres=# rollback ;
ROLLBACK
postgres=# select count(*) from machines;
 count
-------
   150
(1 row)

postgres=#

```

どこでこの設定がされているのかと言うと、rootの~/.psqlrcファイルの中で設定されています。
★の部分が該当します。

```shell
shohei@shohei-ubuntu ~> docker exec -it mypostgres bash
root@6eb0a7dcf81d:/# cat ~/.psqlrc
\pset null '(null)'
\set AUTOCOMMIT off ★
\echo AUTOCOMMIT is :AUTOCOMMIT
root@6eb0a7dcf81d:/#
```

`\echo AUTOCOMMIT is :AUTOCOMMIT`の部分は設定には本来は必要ないですが、こうして現在の状態を表示することでデバッグがやりやすくなりますし、今の設定状況をユーザーが理解しやすくなります。

他にも.psqlrcに記載しておくことで各種起動設定を変えることができます。

本タスクでは1つの例として`\pset null '(null)'`という設定をしています。この設定をすることでデフォルトではnullは空文字と同じ表記になる動作を変え、「(null)」と表示するようになります。こうすることで値が空文字なのかnullなのかが判断しやすくなります。

ぜひ他の設定値についても公式ドキュメントなどを参考に確認してみてください。きっと今まで知らなかった便利な機能が見つかるはずです。

## 恒久対応
さて、今回は.psqlrcにAUTOCOMMITのoffの設定がされていたために事なきを得ました。

このように設定しておくと休止に一生を得ることがありますので、AUTOCOMMITをoffにするかを検討しておくことに価値があるでしょう。

ただし、AUTOCOMMITがoffの設定はPostgreSQLのデフォルト動作と逆ですので、ユーザーが混乱する恐れもあります。
また、「変更したのに変更が反映されていない！」なんてことにもなりかねません。

ケースバイケースなので、ぜひ、利点・欠点を考慮して設定をしてみてください。


## ドキュメント
もし、AUTOCOMMITをoffにするのであれば、現場のwikiやREADMEなどにその旨を記載しておくと、新しく入る方が混乱が少ないと思います。

設定自体も大事ですが、それに付属するドキュメントも充実させるよう努めましょう。

## 参考
以下のページの「AUTOCOMMIT」変数の欄を参照。
https://www.postgresql.jp/docs/9.6/app-psql.html#app-psql-variables

</p>
</details>


