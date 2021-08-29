
let textEdit = document.getElementById('textToWrite');
let velocity = document.getElementById('velocity');
let button = document.querySelector('button');
let result = document.getElementById('result');
let scoreHtml = document.getElementById('score');
let textToWrite;
let textLength;
let v = 0;
let i = 0;
let cumul = 0;
let sec = 0;
let html = '';
let level = 1;
let score = 0;

const letters = "abcdefghijklmnopqrstuvwxyz";
const cutters = "   ,  .   , ";

function randomText(numWords, level){
    let text = '';
    //number of character between 4 and 8
    let numChars = 0;
    let index = 0;
    for(let i=0; i<numWords; i++){
        if(i!=0){
            index = Math.floor(Math.random() * 12);
            text += cutters[index];
            if(index == 3 || index === 10 || index == 6)
                text += ' ';
        }
        numChars = Math.floor(4*(Math.random() + 1));
        for(let j=0; j<numChars; j++){
            index = Math.floor(Math.random() * (level%26 + 1));
            text += letters[index];
        }
        
    }
    text += '.';

    return text;
}





async function myFetch() {
    // let num = rand()
    textEdit.innerHTML = "...";
    textEdit.style.display = '';
    result.style.display = 'none';
    velocity.style.display = 'initial';
    button.style.display = "none";
    let words = level*5;

    // let response = await fetch('http://dinoipsum.herokuapp.com/api/?format=text&paragraphs=1&words=' + words);

    // if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // textToWrite = await response.text();
    // textToWrite = textToWrite.trim();

    textToWrite = randomText(words, level);

    textLength = textToWrite.length;
    textEdit.innerText = textToWrite;
    
    level++;
    v = 0;
    i = 0;
    cumul = 0;
    sec = 0;
    html = '';
}

button.addEventListener('click', myFetch);


// console.log(textToWrite);


function editText(){
    
    html += '<span class="red">';
    html += textToWrite.substr(0,i);
    html += '</span>';
    html += textToWrite.substr(i)

    textEdit.innerHTML = html;
    // console.log(textEdit);
    html = '';
}

window.addEventListener('keydown', (e) => {
    // console.log(text.innerHTML);
    // console.log(textToWrite[i], e.key);

    if(e.key == "Backspace" && i != 0){
        i--;
        editText();
        // console.log(i);
    }

    

    if(textToWrite[i] == e.key){
        // console.log(i, textLength - 1);
        if(textLength - 1 <= i){
            velocity.style.display = "none";
            textEdit.style.display = "none";
            result.style.display = '';
            result.innerHTML = "YOUR SPEED IS  " + (cumul/sec).toPrecision(2) + " words/min";
            // console.log(result);
            score += parseInt(cumul/sec);
            scoreHtml.innerHTML = "Score: " + score;
            button.innerText = "Next level";
            button.style.display = "initial";
//             console.log(scoreHtml);
        }
        i++;
        v++;
        editText();
    }
    
    // console.log(e);
});



setInterval(function(){
    velocity.innerHTML = (v*60)/5 + " words/min";
    cumul += (v*60)/5;
    sec++;
    v = 0;
}, 1000);


