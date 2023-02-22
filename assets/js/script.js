document.addEventListener('DOMContentLoaded', (event) => { // metodo associativo per gestire tutti gli elementi/eventi del DOM


    //https://opentdb.com/api.php?amount=10&category=18&difficulty=easy
    const get = async (url, params) => {             // funzione per gestire la lavorazione asincrona
        const response = await fetch(url + '?' + new URLSearchParams(params))     // impostastione del metodo per effettuare richieste http a un server, e gestirla in modo asincrono 
        const data = await response.json()            // metodo per la formattazione dei dati da inviare/ricevere al server
    
        return data
    }
/*
    get('https://opentdb.com/api.php', {
        amount:20,
        category:18,
        difficulty:"easy"
    }).then(data => console.log(data))
*/

const questions = [                                              // array contenente lista di oggetti che contenengono le domande 
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
  wrong: 1,                             // oggetto contenente domande esatte/sbagliate e la variabile total che mi ritorna gli elementi contenuti nell'oggetto questions
  total: questions.length
}
let questionsCount = 0                              // variabile in cui si va ad inserire il numero di domande che ad ogni giro aumenta di uno, praticamente è il contatore di domande
let timer                        // null
let total = document.querySelector('#benchmark #total') // chiamata per ottenere gli elementi benchmark e cioè la section e total cioè il numero di domande totale
    total.textContent = questions.length   //assegna il numero di elementi presenti nell'array questions alla proprietà textContent dell'oggetto total. 
//sta dicendo al browser di mostrare il numero di elementi presenti nell'array questions come testo all'interno di total


//slideQuestion()
stat()                    // si richiama la funzione stat()

function createFom(questionId) {   
    let question = questions[questionId]   // variabile  che serve a contenere quello che viene recuperato dagli oggetti che hanno chiave 'question' nell'array 'questions' 
    let fielSet = document.createElement('fieldset')  // creare un nodo 'fieldset' nell'elemento document
    let legend  = document.createElement('legend')     // creare un nodo 'legend' nell'elemento document che serve per raggruppare degli elemeti di input e label
        legend.innerHTML = question.question          //   ottenuto il contenuto HTML di legend gli si dà il valore delle domande nell'oggetto/array 'questions'
    let answers = Array.from(question.incorrect_answers)   // si crea un array nuovo identico all'altro con dentro tutte le risposte, ma che a questo punto posso andarmi a modificare
        answers.push(question.correct_answer)       //si va ad aggiungere questo array  
        fielSet.append(legend)  // va ad aggiungere l'elemento legend all'interno dell'elemento fieldSet 

        for (let [i, a] of answers.entries()) {
                let radio =  document.createElement('div')    // si crea un ciclo for per andare a creare un div in cui verrano inserite le risposte contenute negli elementi 'answer'
                    radio.classList.add('answer')             // 

                let input =  document.createElement('input')  // si crea un elemento input
                    input.setAttribute('id', 'radio_' + i)   // crea un attributo id per un elemento di input a cui concatena la stringa 'radio' al valore dinamico di i
                    input.setAttribute('type','radio')           // imposta nuovi valori ai pulsanti
                    input.setAttribute('name','answer')         // imposta un nuovo valore sugli attributi input
                    input.value = a           //  da agli input il valore dinamico di a

                let label =  document.createElement('label')  // si crea un elemento label
                    label.htmlFor = 'radio_' + i           // nuova stringa che viene assegnata a label e che viene concatenata al valore dinamico che assumerà i
                    label.textContent = a                        // i valori del label vengono sostituiti dal contenuto di a

                    radio.append(input, label)             // va ad aggiungere ad un pulsante gli elementi di input e di label
                    fielSet.append(radio)                    // va ad aggiungere radio all'interno dell'elemento fielSet

                    radio.addEventListener('click',(e) => {          // va ad aggiungere un evento 'click' all'interno dell'elemento radio ed eseguira le istruzioni all'interno della funzione
                        questionsCount = questionsCount + 1           // al click questionsCount varrà più 1 e quindi aggiungerà una domanda in più al contatore 
                        question.answer = e.target.value //  value dell'elemento radio mi dirà cosa ha selezionato l'utente che andrà poi elaborato nella proprietà answer
                        console.log(questions);                 // mi ritornerà la risposta cliccata dall'utente       
                        clearInterval(timer)                    // un timer tra una domanda e laltra
                        //setTimeout(continueExecution, 10000)
                        slideQuestion()                       // richiama la funzione scritta appena qui sotto
                    })
                    
        }
        return fielSet                            //
}
function slideQuestion(){
    let second = 60
    let benchmark = document.querySelector('#benchmark form')   // si dichiara una variabile che avrà come valore tutto il form all'interno della seconda section denominata benchmark           
    let current = document.querySelector('#benchmark #current')  //dichiara una variabile che avrà come valore l'indice scorrevole delle domande posto a piè di pagina della seconda section 
    let countDown = document.querySelector("#countdown")        //si crea una variabile a cui successivamente verrà dato il valore di quello che c'è all'interno della variabile second
        countDown.textContent = second
        
   

    if ( questionsCount < questions.length  ) {    // se questionsCount (che adesso vale 0) è minore alla proprietà di stringa dell'oggetto questions fai questo   fintanto che è inferiore               
        timer = setInterval(() => {              // timer adesso assume questo valore e invoca la funzione che dovrà decrementare un secondo dalla variabile second      
          second--
          countDown.textContent = second         //leggerà il valore (dinamico) che c'è dentro second e lo assegnerà anche al cerchietto disegnato intorno al timer
          updateSvgIndicator('#timer .svg-indicator-indication', 40, 60, second)         
          if ( second == 0 ){           // se i secondi saranno pari a zero incrementa il contatore di domande di 1
            questionsCount = questionsCount + 1
            clearInterval(timer)            //ferma il tempo precedentemente impostato con setInterval
            slideQuestion()       // richiama la funzione slideQuestion e ricomincia il giro
          }
          console.log("Delayed for 1 second.");
        }, 1000)               // aspetta 1 secondo per aggiornarmi il contatore

        current.textContent = questionsCount + 1    // incrementa sempre di uno il contatore di domande ma questo agisce proprio a livello grafico 
        benchmark.innerHTML = ''                 // il valore di stringa di benchmark sarà nulla 
        benchmark.append(createFom(questionsCount))           // rilancia la funzione createFom che andrà ad incrementare il contaore e il tutto verrà aggiunto al nodo benchmark                   
    }else{
        console.log('Domande finite');        // sennò mostrami 'domande finite' e lancia la funzione stat()
        stat()    // si richiama la funzione stat ()
        //rimuovere event dalle input
        // passare a slide successive
    }

}
function stat(){
  for (const question of questions) {       // per ogni domanda contenuta nell'oggetto/array  questions      
 //     question.correct_answer == question.answer ? results.correct += 1  : results.wrong += 1
  }
  updateSvgIndicator('.svg-indicator-indication1', 145, results.total, results.wrong)                   // funzione che ha come parametro l'immagine e risultato totale e domande sbagliate
     let correctScore = document.querySelector('#correct p')          // questo si va a selezionare il primo paragrafo delle risposte corrette per andargli a dire successivamente il valore 
         correctScore.textContent =  Number((100/results.total) * results.correct).toFixed(2)  + "%"   // prendi il contenuto della variabile correctScore dividi per 100 il contenuto e sommalo con le domande corrette
     let correctCount = document.querySelectorAll('#correct p:last-child span')  // si va a prendere il gli span dentro l'ultimo p
         correctCount[0].textContent = results.correct     //span contiene il totale delle domande giuste
         correctCount[1].textContent = results.total       //span contiene il totale delle domande

     let wrongScore = document.querySelector('#wrong p')   // questo si va a selezionare il primo paragrafo dentro wrog
         wrongScore.textContent = Number((100/results.total) * results.wrong).toFixed(2) + "%"     //dividera per cento il totale del risultato e lo moltiplicherà per quelle sbagliate e si va a fare i calcoli della percentuale di domande sbagliate
     let wrongCount = document.querySelectorAll('#wrong p:last-child span')    // si va a prendere il gli span dentro l'ultimo p
         wrongCount[0].textContent = results.wrong        //span contiene il totale delle domande sbagliate
         wrongCount[1].textContent = results.total        //span contiene il totale delle domande
         
     
//        correctEl.firstElementChild.textContent = (results.total/100) * results.correct + "%"
//        wrongEl.firstElementChild.textContent = (results.total/100) * results.wrong + "%"
     /*
     <h4>Correct</h4>+
     <p>66%</p>
     <p><span>4</span>/<span>6</span> questions</p>
*/
  console.log(results);        //mostrami i risultati
}
function updateSvgIndicator (el, r, start, current){       //funzione che ha come parametri i valori che andremo a definire nella funzione per dare vita al cerchio della valutazione finale
  let indicator = document.querySelector(el)                           //indicatore sarà el indicato come parametro
  let progress = (100/start)*current                                    //dividi per cento il parametro start eppoi moltiplicalo per il parametro current
  let arcOffset = ( 2*3.14*r ) * ((100 - progress)/100)  // questa matematica farà si che tramite il raggio del cerchio da colorare si possa definire a che punto sia il colore delle giuste e quindi quello delle sbagliate
  indicator.style.strokeDashoffset = arcOffset                            //  darà un attributo CSS all'indicator 
  console.log(arcOffset);                                                  //mostrami arcOffset
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



