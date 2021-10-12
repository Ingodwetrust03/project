'use strict'

let totalInputsArray=[]
    let title, handlerBtns, plusBtn, otherItemsElsNumber, otherItemsElsPercent, inputRange, spanRangeValue, totalInputs, screenBlocks 

   function getElements(){
    title = document.getElementsByTagName('h1')
    handlerBtns =  document.getElementsByClassName('handler_btn')
    plusBtn = document.querySelector('.screen-btn')
    otherItemsElsNumber = document.querySelectorAll('.other-items.number')
    otherItemsElsPercent = document.querySelectorAll('.other-items.percent')
    inputRange = document.querySelector('.rollback input[type=range]')
    spanRangeValue = document.querySelector('.rollback span.range-value')
    totalInputs = document.getElementsByClassName('total-input')
    for(let element of totalInputs) {
        console.log(element) 
    }

    screenBlocks = document.querySelectorAll('.screen')
   
   }
   
   function logger(){
       console.log(title)
       console.log(handlerBtns)
       console.log(plusBtn)
       console.log(otherItemsElsNumber)
       console.log(otherItemsElsPercent)
       console.log(inputRange)
       console.log(spanRangeValue)
       console.log(totalInputs)
       console.log(screenBlocks)
   }

    


   getElements()
   logger()