"use strict"

let title =prompt('Как называется ваш проект?')
console.log(title)
 let screens = prompt('Какие типы экранов нужно разработать?')
 console.log(screens)
 let screenPrice = +prompt('Сколько будет стоить данная работа?')
 console.log(screenPrice)
 let rollback = 25

 let adaptive = Boolean(prompt('Нужен ли адаптив на сайте?'))
 console.log(adaptive)
let service1 = prompt('Какой дополнительный тип услуги нужен?')
console.log(service1)
let servicePrice1 = +prompt('Сколько это будет стоить?')
console.log(servicePrice1)
let service2 = prompt('Какой дополнительный тип услуги нужен?')
console.log(service2)
let servicePrice2 = +prompt('Сколько это будет стоить?')
console.log(servicePrice2)
let fullPrice = screenPrice + servicePrice1 + servicePrice2
console.log(fullPrice)

let servicePercentPrice = parseFloat(fullPrice - fullPrice * (rollback/100))
console.log(servicePercentPrice)



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






 