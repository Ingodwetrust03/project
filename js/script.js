"use strict"

let title =prompt('Как называется ваш проект?')
 let screens = prompt('Какие типы экранов нужно разработать?')
 let screenPrice = +prompt('Сколько будет стоить данная работа?')
 let rollback = 25
 let adaptive = Boolean(prompt('Нужен ли адаптив на сайте?'))
let service1 = prompt('Какой дополнительный тип услуги нужен?')
let servicePrice1 = +prompt('Сколько это будет стоить?')
let service2 = prompt('Какой дополнительный тип услуги нужен?')
let servicePrice2 = +prompt('Сколько это будет стоить?')
let fullPrice = screenPrice + servicePrice1 + servicePrice2



const allServicePrices = function getAllServicePrices(){
    return servicePrice1 + servicePrice2
    }


function getFullPrice(){
    return screenPrice + allServicePrices()
}

fullPrice = getFullPrice()



const getTitle = function(){
    let bigFirstLetter, titleArrayToString
    let titleToLow =  title.toLowerCase()
    let titleArray = titleToLow.split('')
 

    
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


const servicePercentPrice = function getServicePercentPrices(){
        return parseFloat(fullPrice - fullPrice * (rollback/100))
    
}



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



getTitle()



console.log(allServicePrices())
console.log(fullPrice)
console.log(servicePercentPrice())
console.log(screens.split(''))

