const startButtonElement = document.getElementById('start-btn')
const nextButtonElement = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButtonElement.addEventListener('click', startGame)
nextButtonElement.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame () {
    console.log('Started')
    startButtonElement.classList.add('hide')

    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0

    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.questionText
    question.questionAnswers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')

        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButtonElement.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)

    // convert live collection to an array to use foreach
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButtonElement.classList.remove('hide')
    } else {
        startButtonElement.innerText = 'Restart'
        startButtonElement.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        questionText: 'What is 2 + 2?',
        questionAnswers: [
            { text: '4', correct: true },
            { text: '3', correct: false },
            { text: '0', correct: false },
            { text: '7', correct: false }
        ]
    },
    {
        questionText: 'What is 25 + 20?',
        questionAnswers: [
            { text: '5', correct: true },
            { text: '4', correct: false },
            { text: '1', correct: false },
            { text: '8', correct: false }
        ]
    },
    {
        questionText: 'What is 22 + 25?',
        questionAnswers: [
            { text: '10', correct: true },
            { text: '33', correct: false },
            { text: '5', correct: false },
            { text: '17', correct: false }
        ]
    },
    {
        questionText: 'What is 52 + 72?',
        questionAnswers: [
            { text: '14', correct: true },
            { text: '35', correct: false },
            { text: '60', correct: false },
            { text: '97', correct: false }
        ]
    }
]