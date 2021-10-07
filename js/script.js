"use strict"


let rollback = 25

let title, screens, screenPrice, servicePercentPrice, allServicePrices, service1, servicePrice1, service2, servicePrice2,adaptive, fullPrice
let getScreenPrice = 0
let getAddServiceSum 


const isNumber = function(num){
    return !isNaN(parseFloat(num)) && isFinite(num)
}

 
const showTypeOf = function(variable){
    console.log(variable, typeof(variable))
}

 

const questions = function(){

title =prompt('Как называется ваш проект?', 'проект')
screens = prompt('Какие типы экранов нужно разработать?', 'сложные')

    do { 
        screenPrice = prompt('Сколько будет стоить данная работа?')
    } while(!isNumber(screenPrice))
    getScreenPrice = +screenPrice

console.log(typeof getScreenPrice)
adaptive = confirm('Нужен ли адаптив на сайте?')

return getScreenPrice
 }

 

 const getAllServicePrices = function (){
    let sum =0
    for (let i=0; i<2; i++){
        if (i===0){
            service1 = prompt('Какой дополнительный тип услуги нужен?') 
        } else if(i===1) {
            service2 = prompt('Какой дополнительный тип услуги нужен?')  
        }


 do  {
    sum = prompt('Сколько будет стоить данная работа?')   
} while(!isNumber(sum))
getAddServiceSum = +sum 
    getAddServiceSum += getAddServiceSum
}

console.log(getAddServiceSum)

    return getAddServiceSum
}
 

    


const getTitle = function(){
    let bigFirstLetter, titleArrayToString
    let titleToLow =  title.toLowerCase()
    let titleArray = titleToLow.split("")

function makeBigFirstLetter(){
        bigFirstLetter = titleArray[0].toUpperCase()
        titleArray.shift();
        titleArray.unshift(bigFirstLetter)
        titleArrayToString = titleArray.join('')
        console.log(titleArrayToString) 
    }

    if(titleArray[0] == ' '){
        titleArray.splice(0, 1)
        makeBigFirstLetter()
    } else {
        makeBigFirstLetter()
    } 
}

 

const getFullPrice = function(){
    return getScreenPrice + allServicePrices
}
 

const getServicePercentPrices = function(){
        return parseFloat(fullPrice - fullPrice * (rollback/100))
}

 

function showMessage(){
    switch (true){
    case fullPrice > 30000:
        console.log('Даем скидку в 10%')
        break;
    case fullPrice > 15000 &&  fullPrice < 30000:
        console.log('Даем скидку в 5%')
        break;
    case fullPrice < 15000 && fullPrice > 0:
      console.log('Скидка не предусмотрена')
        break;
    case fullPrice < 0:
        console.log('Что то пошло не так')
        break;
    case fullPrice == 0:
    case fullPrice == 15000:
    case fullPrice == 30000:
        console.log('Минимальная стоимость заказа должна превышать 50000')
    break;
    default:
        console.log('Проверьте корректность введенных данных')
}

}

 



questions()
allServicePrices = getAllServicePrices()
fullPrice = getFullPrice()
servicePercentPrice = getServicePercentPrices()
showMessage()
title = getTitle()


showTypeOf(title)
showTypeOf(screenPrice)
showTypeOf( adaptive)



console.log(typeof title)
console.log(typeof screenPrice)
console.log(typeof adaptive)
console.log("Стоимость верстки экранов " + screenPrice + ' рублей/ долларов/гривен/юани')
console.log('Стоимость разработки сайта' + ' ' + fullPrice + ' ' + 'рублей/ долларов/гривен/юани')
