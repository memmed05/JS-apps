function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.checkAnswer = function (ans) {
    return this.answer === ans;
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.isFinish = function (answer) {
    return this.questionIndex === this.questions.length
}

Quiz.prototype.guess = function (answer) {
    var question = this.getQuestion();

    if (question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

var q1 = new Question('What\'s your favorite programming language?', ['java', 'javascript', 'c#', 'c++', 'python'], 'java');
var q2 = new Question('What\'s the most popular programming language?', ['java', 'javascript', 'c#', 'c++', 'python'], 'javascript');
var q3 = new Question('What\'s more difficult programming language?', ['java', 'javascript', 'c#', 'c++', 'python'], 'java');

var questions = [q1, q2, q3];


var quiz = new Quiz(questions);

loadQuestion();

function loadQuestion() {
    if (quiz.isFinish()) {
        showScore();
    } else {
        var question = quiz.getQuestion();
        var choices = question.choices;
        console.log(choices);
        document.querySelector('#question').textContent = question.text;

        for (let i = 0; i < choices.length; i++) {
            var element=document.querySelector('#choice'+i);
            element.innerHTML = choices[i];

            guess('btn' + i, choices[i]);

        }

        showProgress();
    }
}


function guess(id, choice) {
    var btn = document.getElementById(id);
    btn.onclick = function () {
        quiz.guess(choice);
        loadQuestion();
    }
}

function showScore() {
    var html=`<h2>Score</h2><br><h4>${quiz.score}</h4>`;
    document.querySelector('.card-body').innerHTML=html;
}

function showProgress(){
    var totalQuestions=quiz.questions.length;
    var questionNumber=quiz.questionIndex+1;
    document.getElementById('progress').innerHTML=questionNumber+'/'+totalQuestions;
}