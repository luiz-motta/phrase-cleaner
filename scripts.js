var mytext = document.getElementById("my-text");
var mytext2 = document.getElementById("my-text2");
var counter = document.getElementById("counter");
var limit = 255;
var clean1 = document.getElementById("clean-phrase");
var clean2 = document.getElementById("clean-again");
var url = window.location.href;
var badword = document.getElementById("badword-counter");
var badwordcounter;
var badwords = [
    'arrombada',
    'arrombado',
    'babaca',
    'bicha',
    'boiola',
    'canalha',
    'caralho',
    'corno',
    'cu',
    'demente',
    'desgraçada',
    'desgraçado',
    'foda-se',
    'foder',
    'idiota',
    'imbecil',
    'merda',
    'porra',
    'puto',
    'puta',
    'retardada',
    'retardado',
    'safada',
    'safado',
    'sapatona',
    'vagabundo',
    'vagabunda',
    'viado',
    'trouxa'
];

counter.innerText = 0;
mytext.innerText = "";
badwordcounter = 0;

function counterCharacter() {
    counter.innerText = mytext.value.length;
}
function limitCharacter(event) {
    if(mytext.value.length >= limit) {
        event.preventDefault();
    }
}
function cleanPhrase() {
    var mytextclean = mytext.value;
    mytextclean = textReplace(mytextclean);
    if (mytextclean.match(/[*]{3}/) != "***") {
        alert("Sua frase já está limpinha ;)");
    } else {
        window.location = "https://luiz-motta.github.io/phrase-cleaner/phrase-clean.html?mytextclean="+mytextclean;
    }
}
function cleanAgain() {
    document.getElementById('my-text').value = '';
    url = 'https://luiz-motta.github.io/phrase-cleaner/index.html';
}
function textReplace(text) {
    let textclean = text;
    for (let i = 0; i < 30; i++) {
        if (textclean.toLowerCase().match(badwords[i]) == badwords[i]) {       
            textclean = textclean.replace(wordWithRegEx(i), "***");
            i = i - 1;
        }
    }
    while(textclean.match(/[*]{6}/)) {
        textclean = textclean.replace("******", "*** ***");
    }
    return textclean;
}
function wordWithRegEx (number){
    let regextext = new RegExp(badwords[number], "i");
    return regextext;
}

mytext.addEventListener("input", counterCharacter)
mytext.addEventListener("keypress", limitCharacter)

if (url.indexOf('phrase-clean.html') == -1) {
    clean1.addEventListener("click", cleanPhrase)
} else {
    clean2.addEventListener("click", cleanAgain)
}
if (url.match(/phrase-clean\.html\?/) == "phrase-clean.html?") {
    var urlvariable = url;
    urlvariable = urlvariable.substring(urlvariable.lastIndexOf('='));
    urlvariable = urlvariable.substring(1);
    urlvariable = decodeURIComponent(urlvariable);
    counter.innerText = urlvariable.length;
    badwordcounter = (url.match(/[*]{3}/g) || []).length;
    badword.innerText = badwordcounter;
    mytext.innerText = urlvariable;
}
