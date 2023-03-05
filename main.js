const billInput = document.querySelector("#bill-amount")
const tipAmounts = document.querySelectorAll(".tip-amount")
const calculateTipPercentage = document.querySelector("#caculate-tip-percentage")
const splitCheck = document.querySelector("#split-check")
const peopleNumberInput = document.querySelector("#people-number-input")
const splitButton = document.querySelector("#split-button")
let billAmount
let tipPercentage
let tipAmount
let peopleNumber

// Catch the input value 
billInput.addEventListener('input' ,() => {
  billAmount = billInput.value
})

// Map which tip's button was pressed and convert the value from strinh to a number
tipAmounts.forEach((tipAmount) => {
  tipAmount.addEventListener("click", () => {
    tipPercentage = Number(tipAmount.value.replace('%', '')) / 100

    tipAmounts.forEach((tipElement) => { //Reset the style from the other tipAmounts
      if (tipElement.classList.contains('is-selected')) {
        tipElement.classList.remove('is-selected')
      }
    })

    tipAmount.classList.add('is-selected')
  })
})

calculateTipPercentage.addEventListener('click', () => {
  const calculationResult = document.querySelector("#calculation-result")
  const splitOption = document.querySelector("#split-option")
  
  // Check for unexpected values
  if (isNaN(tipPercentage) || typeof billAmount === 'undefined' || billAmount < 0) {
    calculationResult.innerHTML = '<p class="input-error">Be sure to input the correct values!</p>'
    console.log("erro")
  }
  // Validation of the inputs to return an output if the values are correct
  else {
    tipAmount = billAmount * tipPercentage
    tipAmount = (Math.floor(tipAmount * 100) / 100) // Rounds floor the third decimal digit
    calculationResult.innerHTML = `<p>The tip amount is <spam class="highlight">${tipAmount.toFixed(2)}€</spam> relative to <spam>${tipPercentage*100}%</spam> of the total bill of <spam>${billAmount}€</spam>.</p>`

    splitOption.style.display = 'flex'
  }
  calculationResult.style.display = 'flex'
})

// Check if the split is checked show the split options
splitCheck.addEventListener('change', () => {
  const splitCalculation = document.querySelector("#split-calculation")
  
  if (splitCheck.checked) {
    splitCalculation.style.display = 'flex'
  } else {
    splitCalculation.style.display = 'none'
  }
})

//Catch the input value
peopleNumberInput.addEventListener('input', () => {
  peopleNumber = peopleNumberInput.value
})

//Calculate the split amount for each people
splitButton.addEventListener('click', () => {
  const splitResult = document.querySelector("#split-result")

  if (isNaN(peopleNumber) || peopleNumber < 2) {
    splitResult.innerHTML = '<p class="input-error">Be sure to input the correct values!</p>'
  } else {
    let splitAmount = tipAmount / peopleNumber
    splitAmount = (Math.floor(splitAmount * 100) / 100) // Rounds floor the third decimal digit
  
    splitResult.innerHTML = `<p>The total tip amount is <spam class="highlight">${splitAmount.toFixed(2)}€</spam> for each people.</p>`
  }

  splitResult.style.display = 'flex'
})