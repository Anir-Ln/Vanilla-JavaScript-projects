
let textEdit = document.getElementById('textToWrite');
let velocity = document.getElementById('velocity');
let button = document.querySelector('button');
let result = document.getElementById('result');
let textToWrite;
let textLength;
let v = 0;
let i = 0;
let cumul = 0;
let sec = 0;
let html = '';
let level = 0;

async function myFetch() {
    // let num = rand()

    textEdit.innerHTML = "...";
    textEdit.style.display = '';
    result.style.display = 'none';
    velocity.style.display = 'initial';
    button.style.display = "none";
    let words = Math.max(1, level*5);
    let response = await fetch('http://dinoipsum.herokuapp.com/api/?format=text&paragraphs=1&words=' + words);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    textToWrite = await response.text();
    textToWrite = textToWrite.trim();
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

            button.innerText = "Next level";
            button.style.display = "initial";
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


