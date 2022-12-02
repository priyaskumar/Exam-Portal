import {ques} from './questions.js'

let counter = 0;
let TotalTime = 180; // 3 mins = 180 secs

let index = 0;
const grid = document.getElementsByClassName('grid-item');

let score = 0;
let chosenAns = [];
for (let i=0; i<ques.length; i++) {
    chosenAns.push(-1);
}

// initially the current question is set to 1st question
let curGridItem = grid[0];

// function to initialize questions with empty answer arrays
function init() {
    for (let i=0; i<ques.length; i++) {
        ques[i].answer = [];
    }
}

// function to set countdown
function timer() {

    // if timer ends
    if (counter == TotalTime){
        return;
    }
    counter++;

    // calc min and sec
    let min = Math.floor((TotalTime - counter)/60);
    let sec = TotalTime - min*60 - counter;

    console.log(min);

    // alert if 2 mins
    if (min == 2 && sec == 0) alert("2 minutes left !");
    
    // auto submit if times up
    if (min == 0 && sec == 0) submitTest();    

    document.getElementById('secs').innerHTML = sec;
    document.getElementById('mins').innerHTML = min;
    
}
// function to calculate score
function calcScore() {
    

}

// function to submit the test
function submitTest() {

    // set counter to end
    counter = 180;

    // remove questions section
    document.getElementById('questions').classList.remove('flex-row');
    document.getElementById('questions').classList.add('hide');
    
    // add success section
    document.getElementById('success').classList.remove('hide');

    for(let i=0; i<grid.length; i++){
        if(chosenAns[i] == ques[i].answer){
            score++;
        }
    }

    let scored = document.createElement("score");
    scored.id="score";
    scored.innerHTML = "Your Score : "+score+"/20";
    document.getElementById('success').appendChild(scored);

}

// function to display ques
function displayQues(idx) {

    // set question number
    let Idx = idx+1;
    document.getElementById('qno').innerHTML = 'Question No.'+ Idx;
    
    // set question
    document.getElementById('ques').innerHTML = ques[idx].question;

    // set all options
    for (let i=0; i<4; i++) {
        let opt = "null";
        let choice = "null";

        // option 1
        if (i==0) {
            opt = "1st";
            choice = "(A)";
        }

        // option 2
        else if (i==1) {
            opt = "2nd";
            choice = "(B)";
        }

        // option 3
        else if (i==2) {
            opt = "3rd";
            choice = "(C)";
        }

        // option 4
        else if (i==3) {
            opt = "4th";
            choice = "(D)";
        }

        // set the option as checked/marked if chosen
        let checked = false;
        if (ques[idx].answer.includes(ques[idx].options[i])){
            checked = true;
        }

        // display the option
        document.getElementById(`${opt}`).outerHTML = `<input type="${ques[index].type}" id="${opt}" name="answer" value="${ques[idx].options[i]}" ${checked && "checked"}/>`
        document.getElementById(`${opt}_label`).outerHTML = `<label id="${opt}_label" for="${opt}"> <span id="option" >${choice} </span>${ques[idx].options[i]}</label>`
    
    }
}

// function to select a grid
function selectGrid(idx) {
    //console.log("i"+idx);
    index = idx;
    
    // deselect the current question - unmark it from orange
    curGridItem.classList.remove('select-grid');
    
    // update current question to selected grid
    curGridItem = grid[idx];

    // select the question in grid - mark it as orange
    curGridItem.classList.add('select-grid');
    
    // display the corresponding question
    displayQues(idx);
}

// function to choose an option
function chooseOption() {
    
    // get all options of the question displayed
    let options = document.getElementsByName('answer')
    
    for (let i=0; i<options.length; i++) {
        // if the option is chosen
        if (options[i].checked) {

            // make the question as answered
            curGridItem.classList.add('answer-grid');
            
            // add the option to answers of the question
            ques[index].answer.push(options[i].value);
            
            // add the answer to chosenAns
            chosenAns[index] = options[i].value;
        }
    }
}

// function to mark the question to review later
function review() {
    curGridItem.classList.add('review-grid');
}

// function to navigate to next question
function next() {

    // edge case -> reached end of questions
    if(index+1 == grid.length) {
        return;
    }

    // choose the option for current question
    chooseOption();

    // increment the index to point to next grid item
    index++;

    // select the next question and display it
    selectGrid(index);
}

// function to navigate to previous question
function prev() {

    // edge case -> at the beginning of questions
    if(index == 0) {
        return;
    }

    // choose the option for current question
    chooseOption();

    // decrement the index to point to previous grid item
    index--;

    // select the previous question and display it
    selectGrid(index);
}

init();

curGridItem.classList.add('select-grid');

document.getElementById('review-button').addEventListener("click", review);

document.getElementById('prev-button').addEventListener("click", prev);

document.getElementById('next-button').addEventListener("click", next);

document.getElementById('submit-button').addEventListener("click", submitTest);

for (let i=0; i<grid.length; i++){
    grid[i].addEventListener("click", function() {
        chooseOption();
        selectGrid(i);
    });
}

setInterval(timer,1000);