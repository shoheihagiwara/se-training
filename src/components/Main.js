import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


export default function Main({ classes, id }) {

    switch (id) {
        case 'main':
            return (
                <article>
                    <h1>SEトレーニングへようこそ！</h1>
                    <h3 style={{ textAlign: 'left' }}> SEトレーニングとは</h3>
                    <p>SEになるために必要な知識を、本当に起こり得る事例を使って、実際に体験しながら身につけられる勉強サイトです。</p>

                    <h3 style={{ textAlign: 'left' }}> なぜこのアプリを作ったのか？</h3>
                    <p>2011年からソフトウェア開発、保守、運用をしていく中で、SEとして働くために必要に知識を勉強するための無料で手軽な方法が少ないと感じていたからです。</p>
                    <p>「もっと、事前に知識やスキルを学べる方法があればいいのに」と特に新人の頃に強く感じていました。</p>

                    <p>事前に学ぶことが難しいので、現場に入ってから学ぶことになります。そうすると、新人本人にとっても周りの人にとっても負荷が高くて、誰も得をしません。そんな状況を少しでも改善できる一助になればなと思いこの勉強サイトを作ってみました。</p>


                    <h3 style={{ textAlign: 'left' }}>競技プログラミングとは違うの？</h3>
                    <p>私も競技プログラミングなどのサイトはいくつかしてみましたが、競技プログラミングのフォーカスは「新しくプログラムを書く」ことに絞られている気がします。(もし違うサイトがあったらぜひ教えて下さい)</p>
                    <p>しかし、SEの仕事というのは新しくプログラムを書くことだけではないのです。既存プログラムを見て直したり、技術調査をしたり、ネットワークの問題を解決したり、プログラムを書くこと以外のタスクが非常に多いのです。なので、実際に現場に入らないと実際に体験できず、スキルを身につけることが難しいという一面はたしかにあります。本番同等のネットワークなど、各種環境を用意するのは大変ですから。</p>
                    <p>そんな中で、SEの業務の他の部分にもフォーカスして全体的に体験ができるようにしたのが、この勉強サイトです。実際に現場に入ったときに「あ、これ、あの勉強サイトでやったことあるぞ！」と思ってもらえることがあれば幸いです。</p>

                    <h3 style={{ textAlign: 'left' }}>対象とする人</h3>
                    <p>SEでシステム運用保守をこれからする人、または、すでにやり始めた人を対象としています。</p>
                    <p>Linuxでターミナルの作業がある程度できる人を想定しています。具体的には、</p>
                    <lu style={{ textAlign: 'left' }}>
                        <li>cdでディレクトリーを移動することができて、</li>
                        <li>lsでディレクトリー内のファイルを見ることができて、</li>
                        <li>grepでファイルに文字列があることを確認できて、</li>
                        <li>findで条件をいくつか指定してファイルを見つけることができて、</li>
                        <li>psでプロセスがあるかどうかを確認できて、</li>
                        <li>viでファイルを編集して保存できて、</li>
                        <li>コマンドをパイプでつなげて実行できる</li>
                    </lu>
                    <p>くらいの理解力を想定しています。</p>
                    <p>だからと言って、まったくの初心者だからこのアプリで勉強ができないというわけではもちろんないです。わからないことがあったら、それを別途調べればいいんです。実際の仕事でも、すべてのことがわかっているこなんてことはありません。なんとなくわかっているところから始めて、わからないところは調べながらやるのが普通です。この勉強アプリも一緒です。わからないところがあったら自分で調べて進めましょう。自分で調べられるようになるのも勉強の1つなのです。(でもまぁ、あまりに情報が足りなすぎて進まないようでしたら、このサイトが悪いかもしれないのでぜひ教えて下さい)</p>

                    <h3 style={{ textAlign: 'left' }}>進め方</h3>
                    <p>ただ単にタスクを解いていくのではつまらないので、ストーリー形式にしていくことにしました。<br />新人SEであるあなたがある現場に配属されるところから話は始まります。そこから、新人SEであるあなたが現場で起こる様々な問題を解決していきます。(もしくは解決できずに先輩社員に助けてもらいます)</p>

                    <p>それぞれのタスクは数分から数時間で解けるようなものにしました。あまり長いタスクにすると疲れてしまいますし、なにより長すぎて途中でやめてしまうのが一番問題です。また、楽しみながらタスクに取り組めるようにストーリーもできるだけ面白いものにしてみました。</p>

                    <p>左のメニューからタスクを選んで取り組んでいただけます。<br />一番良いのは時系列に従ってタスクを進めてもらうことですが、興味のあるタスクから取り組んでも大丈夫です。ただ、その場合はストーリーが前後するのであまりストーリーを楽しめないかもしれません・・・。あ、もちろんストーリーだけを楽しんで頂くのでも全然ありですよ。</p>

                    <p>とりあえずぜんぶで7タスクを用意しました。人気があったら他にも作るかもしれないです。</p>

                    <p>このアプリがこれからSEを目指す人の助けになれば何よりです。<br />ぜひ、フィードバックをお気軽におよせくださいませ。</p>
                </article>
            )
            break;
        case 'disabledLoginButton':
            return (
                <article>
                    <h1>押せないログインボタン</h1>
                    <p>あなたは社内アプリの保守担当者です。朝、出社すると早速ユーザーから問い合わせが。「今朝、社内アプリにログインしようとしたら、ログインできないんです。あと1時間で片付けたい作業があるので急ぎでなんとかできないでしょうか・・・？」とのこと。早速見てみると、たしかにログインボタンがdisableされているよう。</p>
                    <p>調べてみるとどうやら昨夜のアップデートでバグが混入してしまったようです。このバグを直すだけであれば簡単ですがリリースするには申請がいるためにすぐにはできません。なんとか今回だけユーザーをログインさせることはできないでしょうか？</p>
                    <p>下のURLをクリックすると問題のログイン画面がユーザー名とパスワードが入力された状態で開かれまsす。</p>
                    <br/>
                    <a href="https://shoheihagiwara.github.io/disabled-login-button/" target="_blank" rel="noopener noreferrer" >https://shoheihagiwara.github.io/disabled-login-button/</a>
                    <br/>
                    <br/>
                    <ExpansionPanel>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>答え</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                1つの方法は、ウェブブラウザの開発者ツールを開いて、DOMを直接編集してdisable属性を消す方法があります。そうすれば1回のログインはできるようになります。<br/>
                                もう1つの方法は、HTMLのform要素の内容に注目する方法です。form要素を見ると、 action="./login-success.html" method="GET" となっています。ということは、ウェブブラウザを使いURLを直指定でアクセスすることもできます。
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>

                </article>
            );
        default:
            return (<h1>Nothing to show here. probably a bug.</h1>)
            break;
    }
}