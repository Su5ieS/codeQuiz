let questions = [
    {
        title: "How do you create a function in JavaScript?",
        choices: [ "function = myFunction", "function:myFunction", "function myFunction()"],
        answer: "function myFunction()"
    }, 

    {
        title: "How do you write and IF stateent in JavaScript?",
        choices: [ "if i = 5 then", "if i = 5", "if (i == 5)"],
        answer: "if (i == 5)"
    }, 

    {
        title: "What is the correct way to write a JavaScript array?",
        choices: ["let colors = ['red', 'green', 'blue']", "let colors = 'red', 'green', 'blue'", "let colors =(1:'red', 2:'green', 3:'blue')"], 
        answer: "let colors = ['red', 'green', 'blue']"
    },
];


let score = 0;
let questionIndex = 0;
let timer = document.querySelector("#startTime");
let questionsDiv = document.querySelector("#questionsDiv");
let secondsLeft = 30;
let holdInterval = 0;
let penalty = 5;
let listCreate = document.createElement("ul");

// Starts timer, displays on the screen
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;

            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// puts questions and choices to page: 
function render(questionIndex) {
    // Clears existing data 
    questionsDiv.innerHTML = "";
    listCreate.innerHTML = "";
    // loops through array
    for (let i = 0; i < questions.length; i++) {
        userQuestion = questions[questionIndex].title;
        userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }

    userChoices.forEach(function (newItem) {
        listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(listCreate);
        listCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// Event to compare choices with answers
function compare(event) {
    element = event.target;

    if (element.matches("li")) {

        createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");

        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;

        } else {
            // Will deduct -5 seconds off secondsLeft for wrong answers
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// All done will append last page
function allDone() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // Heading for game over
    createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // Paragraph
    createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // Calculates time remaining and replaces it with score
    if (secondsLeft >= 0) {
        timeRemaining = secondsLeft;
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;
        questionsDiv.appendChild(createP);
    }

    // Label for input box
    createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input for initials
    let createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit button to add to high scores list
    createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // Event listener to capture initials and local storage for initials and score
    createSubmit.addEventListener("click", function () {
        let initials = createInput.value;

        if (initials === "") {
           alert("Please enter your initials")

        } else {
            finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            allScores = localStorage.getItem("allScores");
        if (allScores === null) {
                allScores = [];
        } else {
                allScores = JSON.parse(allScores);
            }

            allScores.push(finalScore);
            newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./highscores.html");
        }
    });

} 
