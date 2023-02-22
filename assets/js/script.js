document.addEventListener('DOMContentLoaded', (event) => {


    //https://opentdb.com/api.php?amount=10&category=18&difficulty=easy
    const get = async (url, params) => {
        const response = await fetch(url + '?' + new URLSearchParams(params))
        const data = await response.json()
    
        return data
    }
/*
    get('https://opentdb.com/api.php', {
        amount:20,
        category:18,
        difficulty:"easy"
    }).then(data => console.log(data))
*/

const questions = [
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "What does CPU stand for?",
      correct_answer: "Central Processing Unit",
      incorrect_answers: [
        "Central Process Unit",
        "Computer Personal Unit",
        "Central Processor Unit",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
      correct_answer: "Final",
      incorrect_answers: ["Static", "Private", "Public"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "The logo for Snapchat is a Bell.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question:
        "Pointers were not used in the original C programming language; they were added later on in C++.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the most preferred image format used for logos in the Wikimedia database?",
      correct_answer: ".svg",
      incorrect_answers: [".png", ".jpeg", ".gif"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "In web design, what does CSS stand for?",
      correct_answer: "Cascading Style Sheet",
      incorrect_answers: [
        "Counter Strike: Source",
        "Corrective Style Sheet",
        "Computer Style Sheet",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "What is the code name for the mobile operating system Android 7.0?",
      correct_answer: "Nougat",
      incorrect_answers: [
        "Ice Cream Sandwich",
        "Jelly Bean",
        "Marshmallow",
      ],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question: "On Twitter, what is the character limit for a Tweet?",
      correct_answer: "140",
      incorrect_answers: ["120", "160", "100"],
    },
    {
      category: "Science: Computers",
      type: "boolean",
      difficulty: "easy",
      question: "Linux was first created as an alternative to Windows XP.",
      correct_answer: "False",
      incorrect_answers: ["True"],
    },
    {
      category: "Science: Computers",
      type: "multiple",
      difficulty: "easy",
      question:
        "Which programming language shares its name with an island in Indonesia?",
      correct_answer: "Java",
      incorrect_answers: ["Python", "C", "Jakarta"],
    },
    {
        category: "Science: Computers",
        type: "multiple",
        difficulty: "easy",
        question:
          "Which programming language shares its name with an island in Indonesia?",
        correct_answer: "Java",
        incorrect_answers: ["Python", "C", "Jakarta"],
      }    
  ];
let results = {
  correct: 10,
  wrong: 1,
  total: questions.length
}
let questionsCount = 0
let timer
let total = document.querySelector('#benchmark #total')
    total.textContent = questions.length


//slideQuestion()
stat()

function createFom(questionId) {
    let question = questions[questionId]
    let fielSet = document.createElement('fieldset')
    let legend  = document.createElement('legend')
        legend.innerHTML = question.question
    let answers = Array.from(question.incorrect_answers)
        answers.push(question.correct_answer)
        fielSet.append(legend)

        for (let [i, a] of answers.entries()) {
                let radio =  document.createElement('div')
                    radio.classList.add('answer')

                let input =  document.createElement('input')
                    input.setAttribute('id', 'radio_' + i)
                    input.setAttribute('type','radio')
                    input.setAttribute('name','answer')
                    input.value = a

                let label =  document.createElement('label')
                    label.htmlFor = 'radio_' + i
                    label.textContent = a

                    radio.append(input, label)
                    fielSet.append(radio)

                    radio.addEventListener('click',(e) => {
                        questionsCount = questionsCount + 1
                        question.answer = e.target.value
                        console.log(questions);
                        clearInterval(timer)
                        //setTimeout(continueExecution, 10000)
                        slideQuestion()
                    })
                    
        }
        return fielSet
}
function slideQuestion(){
    let second = 60
    let benchmark = document.querySelector('#benchmark form')
    let current = document.querySelector('#benchmark #current')
    let countDown = document.querySelector("#countdown")
        countDown.textContent = second
        
   

    if ( questionsCount < questions.length  ) {
        timer = setInterval(() => {
          second--
          countDown.textContent = second
          updateSvgIndicator('#timer .svg-indicator-indication', 40, 60, second)
          if ( second == 0 ){
            questionsCount = questionsCount + 1
            clearInterval(timer)
            slideQuestion()
          }
          console.log("Delayed for 1 second.");
        }, 1000)

        current.textContent = questionsCount + 1
        benchmark.innerHTML = ''
        benchmark.append(createFom(questionsCount))
    }else{
        console.log('Domande finite');
        stat()
        //rimuovere event dalle input
        // passare a slide successive
    }

}
function stat(){
  for (const question of questions) {
 //     question.correct_answer == question.answer ? results.correct += 1  : results.wrong += 1
  }
  updateSvgIndicator('.svg-indicator-indication1', 145, results.total, results.wrong) 
     let correctScore = document.querySelector('#correct p')
         correctScore.textContent =  Number((100/results.total) * results.correct).toFixed(2)  + "%"
     let correctCount = document.querySelectorAll('#correct p:last-child span')
         correctCount[0].textContent = results.correct
         correctCount[1].textContent = results.total

     let wrongScore = document.querySelector('#wrong p')
         wrongScore.textContent = Number((100/results.total) * results.wrong).toFixed(2) + "%"
     let wrongCount = document.querySelectorAll('#wrong p:last-child span') 
         wrongCount[0].textContent = results.wrong
         wrongCount[1].textContent = results.total
         
     
//        correctEl.firstElementChild.textContent = (results.total/100) * results.correct + "%"
//        wrongEl.firstElementChild.textContent = (results.total/100) * results.wrong + "%"
     /*
     <h4>Correct</h4>+
     <p>66%</p>
     <p><span>4</span>/<span>6</span> questions</p>
*/
  console.log(results);
}
function updateSvgIndicator (el, r, start, current){
  let indicator = document.querySelector(el)
  let progress = (100/start)*current
  let arcOffset = ( 2*3.14*r ) * ((100 - progress)/100)
      indicator.style.strokeDashoffset = arcOffset
  console.log(arcOffset);
  //console.log(indicator.style.strokeDashoffset);
  /*
  size = 100
  strokeWidth = 10
  center = size / 2
         = 100 / 2 = 50
  radius = center - strokeWidth 
         = 50 - 10 = 40
  progress = 0
  arcLength = 2 * π * radius 
            = 2 * 3.14 * 40 = 251.2
  arcOffset = arcLength * ((100 - progress)/100) 
            = 251.2 * ((100 - 0)/100) = 251.2
*/


}
})



