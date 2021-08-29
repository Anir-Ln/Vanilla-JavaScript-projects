let counter = document.getElementById('counter');
counter.innerHTML = 6;

// let counter = document.getElementById("counter");
let decrease = document.getElementById('decrease');
let increase = document.getElementById('increase');
let reset = document.getElementById('reset');

// counter.innerHTML = "odkos";

// console.log(counter.innerHTML);

// increase.addEventListener('click', function(){
//     modifyCounter(1);
// });
increase.addEventListener('click', () => modifyCounter(1));
decrease.addEventListener('click', () => modifyCounter(-1));
reset.addEventListener('click', () => modifyCounter(0));


function modifyCounter(change){
    if(change == 0){
        counter.innerHTML = 0;
        return;
    }
    
    if(change == 1){
        // counter.innerHTML = +counter.innerHTML + 1;
        // or
        counter.innerHTML = Number(counter.innerHTML) + 1;
        return;
    }

    if(change == -1)
        counter.innerHTML -= 1;
}



