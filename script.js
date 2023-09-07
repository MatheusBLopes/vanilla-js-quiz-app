const startBtn = document.querySelector('.start_btn button'),
rules = document.querySelector('.rules'),
exitBtn = rules.querySelector('.buttons .quit'),
continueBtn = rules.querySelector('.buttons .restart'),
quizBox = document.querySelector('.quiz_box'),
resultBox = document.querySelector('.result_box'),
optionsList = document.querySelector('.options_list'),
timeLine = document.querySelector('header .time_line'),
timeText = document.querySelector('.timer .time_left_txt'),
timeCount = document.querySelector('.timer .timer_sec'),
restartQuiz = resultBox.querySelector('.buttons .restart'),
leave = resultBox.querySelector('.buttons .quit');


let timeValue = 15,
queCount = 0,
queNumber = 1,
userRating = 0,
counter,
counterLine,
widthValue = 0;

startBtn.onclick = () => {
    rules.classList.add("activeInfo")
}

exitBtn.onclock = () => {
    rules.classList.remove("activeInfo")
}

continueBtn.onclick = () => {
    rules.classList.remove("activeInfo")
    quizBox.classList.add("activeInfo")
    show_questions(0)
    queCounter(1)
    startTimer(15)
    startTimeLine(0)
}

restartQuiz.onclick = () => {
    quizBox.classList.add("activeQuiz");
    resultBox.classList.remove("activeResult");
    timeValue = 15;
    queCount = 0;
    queNumb = 1;
    userRating = 0;
    widthValue = 0;
    show_questions(queCount)
    queCounter(queNumber);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimer(timeValue);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    nextBtn.classList.remove('show')
}

leave.onclick = () => {
    window.location.reload();
}

const nextBtn = document.querySelector('footer .next_btn'),
question_counter_down = document.querySelector('footer .total_que');

nextBtn.onclick = () => {
    if(queCount < questions.length - 1) {
        queCount++;
        queNumb++;
        show_questions(queCount);
        queCounter(queNumb);
        clearInterval(counter);
        clearInterval(counterLine);
        startTimeLine(widthValue);
        startTimer(timeValue);
        timeText.textContent = "Time Left"
        nextBtn.classList.remove("show")
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        show_result()
    }
}

function show_questions(index) {
    const queText = document.querySelector('.que_text')
    let queTag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>'
    let optionTag = '<div class="option"><span>'+ question[index].options[0] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
    + '<div class="option"><span>' + questions[index].options[3] + '</span></div>'

    queText.innerHTML = queTag

    optionsList.innerHTML = optionTag

    const option = optionsList.querySelectorAll('.option')

    for(i=0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)")
    }
}

let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>'

function optionSelected(answer) {
    clearInterval(counter)
    clearInterval(counterLine)
    let userAnswer = answer.textContent
    let correctAnswer = questions[queCount].answer
    const allOptions = optionsList.children.length

    if(userAnswer == correctAnswer) {
        userRating += 1
        answer.classList.add("correct")
        answer.insertAdjacentHTML('beforeend', tickIcon)
        console.log('Correct Answer')
        console.log('Your correct answers = ' + userRating)
    } else {
        answer.classList.add('incorrect')
        answer.insertAdjacentHTML('beforeend', crossIcon)
        console.log('Wrong Answer')

        for (i=0; i < allOptions; i++) {
            if (optionsList.children[i].textContent == correctAnswer) {
                optionsList.children[i].setAttribute('class', 'option correct')
                optionsList.children[i].insertAdjacentHTML('beforeend', tickIcon)
                console.log('Auto selected correct answer')
            }
        }
    }

    for (i=0; i < allOptions; i++) {
        optionsList.children[i].classList.add('disabled')
    }
    nextBtn.classList.add('show')
}

function show_result() {
    rules.classList.remove('activeInfo')
    quizBox.classList.remove('activeQuiz')
    resultBox.classList.add('activeResult')
    const score = resultBox.querySelector('.score_text')

    if (userRating > 3) {
        let scoreTag = '<span>and congrats! , You got <p>' + userRating + '</p> out of <p>' + questions.length + '</p></span>'
        score.innerHTML = scoreTag
    } else if (userRating > 1) {
        let scoreTag = '<span>and rice, You got <p>' + userRating + '</p> out of <p>' + questions.length + '</p></span>'
        score.innerHTML = scoreTag
    } else {
        let scoreTag = '<span>and sorry! , You got only <p>' + userRating + '</p> out of <p>' + questions.length + '</p></span>'
        score.innerHTML = scoreTag
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000)
    function timer() {
        timeCount.textContent = time
        time--

        if(time < 9) {
            let addZero = timeCount.textContent
            timeCount.textContent = "0" + addZero
        }

        if(time < 0) {
            clearInterval(counter)
            timeText.textContent = "Time off"
            const allOptions = optionsList.children.answer
            for(i = 0; i < allOptions; i++) {
                if (optionsList.children[1].textContent == correctAnswer) {
                    optionsList.children[i].setAttribute('class', 'option correct')
                    optionsList.children[i].insertAdjacentHTML('beforeend', tickIcon)
                    console.log('Time Off: Auto selected correct answer')
                }
            }

            for (i=0; i < allOptions; i++) {
                optionsList.children[i].classList.add('disabled')
            }

            nextBtn.classList.add('show')
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29)
    function timer() {
        time += 1
        timeLine.style.width = time + "px"
        if (time > 549) {
            clearTimeout(counterLine)
        }
    }
}

function queCounter(index) {
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>'
    question_counter_down.innerHTML = totalQueCounTag
}