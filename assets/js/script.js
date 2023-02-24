document.addEventListener('DOMContentLoaded', (event) => {


//https://opentdb.com/api.php?amount=10&category=18&difficulty=easy
const get = async (url, params) => {
    const response = await fetch(url + '?' + new URLSearchParams(params))
    const data = await response.json()

    return data
}

let questions = localStorage.results ? JSON.parse(localStorage.results) : {}
let questionsCount = 0
let timer
let main = document.querySelector('#main')
let rateBtn = true

//Object.keys( questions).length > 0 ?  refreshPage('results', renderResults,resultsAnimation) :  welcome()

if (Object.keys( questions).length > 0) {
    refreshPage ('results', renderResults,resultsAnimation)
    rateBtn = false
}else{
  welcome()
}


function welcome() {
  let proceed = document.querySelector('button')
      proceed.addEventListener('click', (e) =>{
          refreshPage('difficulty', renderdifficulty)
          })

    document.querySelector('#main input[type="checkbox"]').addEventListener('click', (e) =>{
      e.target.checked ? proceed.disabled = false : proceed.disabled = true
    })
    
//questa funzione prende determinati parametri che successivamente serviranno per
//riassegnare un valore al main, svuotarlo e riaggiornare il template per avere una nuova pagina

function refreshPage(next, render, animation = false){
    let template = document.querySelector('#' + next).content.cloneNode(true)    
        main.className = next                                                   
        main.innerHTML = ''                                                     
        main.append(render(template))                                           

        if( animation ){
            animation()
        }
        
}
function renderdifficulty(template) {
  let amount = template.querySelector('input[name="amout"]')
  let difficulty = template.querySelector('select[name="difficulty"]')
  let btn = template.querySelector('button')
  let loader = template.querySelector('.loader')

  amount.addEventListener('change',(e) =>{
    e.target.checkValidity() ? btn.disabled = false : btn.disabled = true
  })
  template.querySelector('button').addEventListener('click', (e) =>{
    loader.classList.add('active')
    e.target.disabled = true 
    get('https://opentdb.com/api.php', {
      amount: amount.value,
      category:18,
      difficulty: difficulty.value
    }).then((data) => {
      if ( data.results ){
        questions = data.results
        loader.classList.remove('active')
        refreshPage('benchmark', renderBenchmark, countDownAnimation)
      }

      console.log(data)
    })
  })
  return template
}
function renderFeedback(template){
    let typingTimer
    let rating = template.querySelector('.rating')                        
    let input = template.querySelector('input')                           
    let btn = template.querySelector('button')

    for (let i = 0; i < 10; i++) {
      let radio = createRadio(i, i + 1, {type: 'radio', name: 'rating'})
          rating.append(radio.input, radio.label)
    }
    input.addEventListener('keyup', (e) =>{
      clearTimeout(typingTimer);
      typingTimer = setTimeout(()=>{
        btn.disabled = false
      }, 1000);
    })

    btn.addEventListener('click', (e) =>{
        location.reload()
    })
    return template
}
function renderResults(template){
      let results = buildResults()
      let stats = Object.keys(results)
      let msg = template.querySelectorAll('.testocentro')
      let btn = template.querySelector('button')

      if(btn == false){
        btn.style.display = 'none'
      }

      if ((100/questions.length)*results.wrong > 40 ){
          msg[0].classList.remove('hideMsg')
          msg[1].classList.add('hideMsg')
      }else{
          msg[0].classList.add('hideMsg')
          msg[1].classList.remove('hideMsg')
      }

      for (const stat of stats) {
          let partial = stat == 'correct' ? results.correct : results.wrong
          let el = template.querySelector(`#${stat} p`)
              el.textContent =  Number((100/questions.length) * partial).toFixed(2)  + "%"
          let count = template.querySelectorAll(`#${stat} p:last-child span`)
              count[0].textContent = partial
              count[1].textContent = questions.length
      }

      template.querySelector('button').addEventListener('click', (e) =>{
              refreshPage('feedback', renderFeedback)
      })  

  return template
}
function renderBenchmark (template){
  
  
  let second = Math.floor(Math.random()*2) ? 60 : 30
  let question = questions[questionsCount]
  let answers = Array.from(question.incorrect_answers)
      answers.push(question.correct_answer)  
  let alert ={
    title: 'Error!',
    text: 'Do you want to continue',
    icon: 'error',
    confirmButtonText: 'Cool'
  }

  let countDown = template.querySelector("#countdown")
      countDown.setAttribute("data-seconds", second);
      countDown.textContent = second

  let current = template.querySelector('#current')
      current.textContent = questionsCount + 1

  let total = template.querySelector('#total')
      total.textContent = questions.length

  let fieldset = template.querySelector('fieldset')
      fieldset.innerHTML = ''

  let legend  = document.createElement('legend')
      legend.innerHTML = question.question

      fieldset.append(legend)
      for (let [i, a] of answers.entries()) {
        
        let radio =  createRadio(i,a,{type: 'radio', name: 'answer'})
            radio.input.addEventListener('click',(e) => {
                    question.answer = e.target.value
                    clearInterval(timer)
                    if ( questionsCount < questions.length - 1 ){
                      questionsCount = questionsCount + 1                      
                      refreshPage('benchmark', renderBenchmark, countDownAnimation)
                    }else{
                      localStorage.setItem('results', JSON.stringify(questions));
                      refreshPage('results', renderResults,resultsAnimation)
                    }
                    /*Swal.fire(alert).then((result) => {
                      if (result.isConfirmed) {

                      }
                    })*/
                })
                fieldset.append(radio.input, radio.label)
      }
 
      return template
}

function resultsAnimation() {
  let ctx = document.getElementById('scorePie');
  let results = buildResults()
      results = Object.keys(results).reverse().reduce((a, c) => (a[c] = results[c], a), {})
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(results),
      datasets: [{
        data: Object.values(results),
        backgroundColor: ["#D20094", "#00FFFF"],
        borderJoinStyle: "#000000",
        borderWidth: 0,
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: {
            display: false
        },
    }
  }
  });


}

function countDownAnimation () {

    let timerEl = document.querySelector('#timer .svg-indicator-indication')
    let countDown = document.querySelector("#countdown")
    let second = start  = countDown.dataset.seconds


    if ( questionsCount < questions.length  ) {
      timer = setInterval(() => {
        second--
        countDown.textContent = second
        updateSvgIndicator(timerEl, 40, start, second)
        if ( second == 0 ){
          questionsCount = questionsCount + 1
          clearInterval(timer)
          refreshPage('benchmark', renderBenchmark, countDownAnimation)
        }
        console.log("Delayed for 1 second.");
      }, 1000)
  }else{
      console.log('Domande finite');
      refreshPage('results', renderResults)
  }
}

function createRadio (i, v, p){

  let input =  document.createElement('input')
      input.setAttribute('type', p.type)
      input.setAttribute('id', `${p.name}_${i}`)
      input.setAttribute('name', p.name)
      input.value = v      
  let label =  document.createElement('label')
      label.htmlFor = `${p.name}_${i}`
      label.innerHTML = v

  return { input: input, label: label }
}

function updateSvgIndicator (el, r, start, current){
  let progress = (100/start)*current
  let arcOffset = ( 2*3.14*r ) * ((100 - progress)/100)
      el.style.strokeDashoffset = arcOffset
}

function buildResults() {
  let results = {
    correct: 0,
    wrong: 0
  }
  for (const question of questions) {
      question.correct_answer == question.answer ? results.correct += 1  : results.wrong += 1
  }
  return results
}
})



