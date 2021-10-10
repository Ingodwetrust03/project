"use strict"


const appData = {
    rollback: 25,
    title: '',
    screens: '',
    screenPrice: 0,
    servicePercentPrice: 0,
    allServicePrices: 0,
    service1: '',
    service2: '',
    adaptive: true,
    fullPrice: 0,
    getScreenPrice: '',
    getAddServiceSum: 0,
    logMessage: '',
    bigFirstLetter: [], 
    titleArrayToString: '',
    titleToLow: '',
    titleArray: [],

    questions: function(){

        appData.title =prompt('Как называется ваш проект?', 'проект')
        appData.screens = prompt('Какие типы экранов нужно разработать?', 'сложные')
        
            do { 
                appData.screenPrice = prompt('Сколько будет стоить данная работа?')
            } while(!isNumber(appData.screenPrice))
            appData.getScreenPrice = +appData.screenPrice
        
        console.log(typeof appData.getScreenPrice)
        appData.adaptive = confirm('Нужен ли адаптив на сайте?')
        
        return appData.getScreenPrice
         },

    getAllServicePrices: function (){
            let sum =0
            for (let i=0; i<2; i++){
                if (i===0){
                    appData.service1 = prompt('Какой дополнительный тип услуги нужен?') 
                } else if(i===1) {
                    appData.service2 = prompt('Какой дополнительный тип услуги нужен?')  
                }
        
        
         do  {
            sum = prompt('Сколько будет стоить данная работа?')   
        } while(!isNumber(sum))
        appData.getAddServiceSum = +sum 
        appData.getAddServiceSum += appData.getAddServiceSum
        }
        
        console.log(appData.getAddServiceSum)
        
            return appData.getAddServiceSum
        },

    getFullPrice: function(){
    return appData.getScreenPrice + appData.allServicePrices
},
 
    getServicePercentPrices: function(){
        return parseFloat(appData.fullPrice - (appData.fullPrice * (appData.rollback/100)))
},

   showMessage: function (){
    switch (true){
    case appData.fullPrice > 30000:
        console.log('Даем скидку в 10%')
        break;
    case appData.fullPrice > 15000 &&  appData.fullPrice < 30000:
        console.log('Даем скидку в 5%')
        break;
    case appData.fullPrice < 15000 && appData.fullPrice > 0:
      console.log('Скидка не предусмотрена')
        break;
    case appData.fullPrice < 0:
        console.log('Что то пошло не так')
        break;
    case appData.fullPrice == 0:
    case appData.fullPrice == 15000:
    case appData.fullPrice == 30000:
        console.log('Минимальная стоимость заказа должна превышать 50000')
    break;
    default:
        console.log('Проверьте корректность введенных данных')
}

},
   getTitle: function(){
    appData.titleToLow =  appData.title.toLowerCase()
    appData.titleArray = appData.titleToLow.split("")
    
    function makeBigFirstLetter(){
        appData.bigFirstLetter = appData.titleArray[0].toUpperCase()
        appData.titleArray.shift();
        appData.titleArray.unshift(appData.bigFirstLetter)
        appData.titleArrayToString = appData.titleArray.join('')
        appData.title = appData.titleArrayToString
            return appData.title 
        }
    
        if(appData.titleArray[0] == ' '){
            appData.titleArray.splice(0, 1)
            makeBigFirstLetter()
        } else {
            makeBigFirstLetter()
        } 
    }, 

   logger: function(){
    for (let key in appData){
    console.log(key + ': ' +appData[key])
    }
},

    start: function(){
    appData.questions()
    appData.allServicePrices = appData.getAllServicePrices()
    appData.fullPrice = appData.getFullPrice()
    appData.servicePercentPrice = appData.getServicePercentPrices()
    appData.showMessage()
    appData.title = appData.getTitle()
    appData.logMessage = appData.logger()
 },


}

const isNumber = function(num){
    return !isNaN(parseFloat(num)) && isFinite(num)
}

/* function getTitle(){
    return appData.title.trim()[0].toUpperCase()+ appData.title.trim().substr(1).toLowerCase
} */


 


appData.start()




console.log(appData.servicePercentPrice)
console.log("Стоимость верстки экранов " + appData.screenPrice + ' рублей/ долларов/гривен/юани')
console.log('Стоимость разработки сайта' + ' ' + appData.fullPrice + ' ' + 'рублей/ долларов/гривен/юани')
