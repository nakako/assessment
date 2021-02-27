'use strict'; 
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供をすべて削除する
 * @param {HTMLElement} element HTMLの要素
 */
function removeAllChildren(element) {
    // while(element.firstChild){
    //     element.removeChild(element.firstChild);
    // }
    element.innerHTML = '';
}

/**
 * 指定した要素に診断結果用のタグを設定する
 * @param {HTMLElement} element HTMLの要素
 * @param {HTMLElement} result 結果文
 */
function appendAssessmentResult(element, result){
    // '診断結果'の文字を表示
    const h3 = document.createElement('h3');    //h3タグのオブジェクトを作成
    h3.innerText = '診断結果';  //h3タグに'診断結果'の文字列を設定
    element.appendChild(h3);  //result-areaにh3変数を設定(HTMLに設定)

    // 結果を表示
    const p = document.createElement('p');
    p.innerText = result;
    element.appendChild(p); 
}

/**
 * 指定した要素にツイートボタンを設定する
 * @param {HTMLElement} element HTMLの要素
 * @param {HTMLElement} result ツイート文
 */
function appendTweetButton(element, result){
    // twitterボタンの表示
    // aタグを作って属性を設定
    const a = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('猫タイプ診断') + '&ref_src=twsrc%5Etfw';
    a.setAttribute('href', hrefValue);  //専用のプロパティが用意されていないものはAttributeで設定する
    a.setAttribute('class', 'twitter-hashtag-button');
    a.setAttribute('data-text', result);
    a.setAttribute('data-show-count', 'false');
    a.innerText = 'Tweet #猫タイプ診断';
    tweetDivided.appendChild(a); 
    // Scriptタグを作る
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    script.setAttribute('charset', 'utf-8');
    tweetDivided.appendChild(script);
}


assessmentButton.onclick = () => {  //アロー関数(無名関数の省略形)：他で利用しない場合は関数名の省略が可能 assessmentButton.onclick = function function_name() {
    const userName = userNameInput.value;
    // ガード句：名前が空の時は処理を終了する
    if(!userName){
        return;
    }
    // すでにある診断結果を削除
    removeAllChildren(resultDivided);
    removeAllChildren(tweetDivided);

    // 診断を実行
    const result = assessment(userName);

    // 診断結果表示の作成
    appendAssessmentResult(resultDivided, result);

    // tweetボタンの作成
    appendTweetButton(resultDivided, result);
}

userNameInput.onkeydown = event => {
    if(event.key === 'Enter'){
        assessmentButton.onclick();
    }
}

const answers = [
    '{userName}は黒猫です。{userName}は人懐っこく賢いため飼い主さんの良い相棒でしょう。',
    '{userName}は白猫です。{userName}は警戒心が強く、心を許した時に見せる仕草は格別に感じられるでしょう。',
    '{userName}は三毛猫です。{userName}の気まぐれでミステリアスな性格に、周りは釘付けでしょう。',
    '{userName}ハチワレです。{userName}はユニークな見た目で皆を楽しくさせます。',
];


/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    let number = 0;
    for(let i = 0 ; i < userName.length ; i++){
        number += userName.charCodeAt(i);
    }
    let index = number % answers.length;
    return answers[index].replace(/\{userName\}/g, userName);  //正規表現を使って対象文字列を全て置換
}

console.assert(
    assessment('太郎') === '太郎は黒猫です。太郎は人懐っこく賢いため飼い主さんの良い相棒でしょう。'
);

console.assert(
    assessment('太郎') === assessment('太郎'),
    '同一入力に対して、異なる診断結果が出力されています'
);