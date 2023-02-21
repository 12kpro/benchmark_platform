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

let questionsCount = 0


let total = document.querySelector('#benchmark #total')
    total.textContent = questions.length


slideQuestion()


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
                    input.value = a

                let label =  document.createElement('label')
                    label.htmlFor = 'radio_' + i
                    label.textContent = a

                    radio.append(input, label)
                    fielSet.append(radio)

                    input.addEventListener('click',(e) => {
                        questionsCount = questionsCount + 1
                        question.answers = e.target.value
                        console.log(questions);
                        slideQuestion()
                    })
                    
        }
        return fielSet
}
function slideQuestion(){
    let benchmark = document.querySelector('#benchmark form')
    let current = document.querySelector('#benchmark #current')

    if ( questionsCount < questions.length  ) {
        current.textContent = questionsCount + 1
        benchmark.innerHTML = ''
        benchmark.append(createFom(questionsCount))
    }else{
        console.log('Domande finite');
        //rimuovere event dalle input
        // passare a slide successive
    }

}
function validate(){

}



})



