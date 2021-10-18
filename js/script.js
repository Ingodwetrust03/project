"use strict"

const  title = document.getElementsByTagName('h1')[0]
const startBtn = document.getElementsByClassName('handler_btn')[0]
let screens = document.querySelectorAll('.screen')
const buttonPlus = document.querySelector('.screen-btn')
const otherItemsPercent = document.querySelectorAll('.other-items.percent')
const otherItemsNumber = document.querySelectorAll('.other-items.number')
const total = document.getElementsByClassName('total-input')[0]
const totalCount = document.getElementsByClassName('total-input')[1]
const totalCountOther = document.getElementsByClassName('total-input')[2]
const fullTotalCount = document.getElementsByClassName('total-input')[3]
const totalCountRollback = document.getElementsByClassName('total-input')[4]
let range = document.querySelector('input[type=range')
let rangeValue = document.querySelector('.range-value')
let fullPrice
let fullPriceWithRollback 
let rollback
let screensCounter


const appData = {
	rollback: 25,
	title: '',
	screens: [],
	screenPrice: 0,
	servicePricesPercent: 0,
    servicePricesNumber: 0,
	servicesPercent: {},
    servicesNumber: {},
	adaptive: true,
	getScreenPrice: '',
	getAddServiceSum: 0,
    fullPrice: 0,
    fullPriceWithRollback: 0,
    rollback: 0,
    screensCounter: 0,

  
    init: function(){
        startBtn.disabled = true
        appData.addTitle()
        appData.check()
        appData.rollback()
        startBtn.addEventListener('click', function(){
            appData.check()
            appData.start()
            })
            
        buttonPlus.addEventListener('click', function(){
            appData.addScreenBlock()
            appData.check()
        })
    },
    addScreenBlock: function(){
        const cloneScreen = screens[0].cloneNode(true)
        screens[screens.length-1].after(cloneScreen)
        console.log(cloneScreen)
    },
    addTitle: function(){
        document.title = title.textContent
    },
    check: function(){
        let firstElementBlock = document.querySelectorAll('.element')[0]
        let firstElementBlockInputsArr = firstElementBlock.querySelectorAll('input')
        let firstElementBlockSelectsArr = firstElementBlock.querySelectorAll('select')
        let screensInputsArray = [...firstElementBlockInputsArr, ...firstElementBlockSelectsArr]
        console.log(screensInputsArray)

       
        screensInputsArray.forEach(function(item){
        item.addEventListener('input', function(){
            if(item.value === '' ){
            startBtn.disabled = true
            console.log('true')
        } else {
            startBtn.disabled = false
            console.log('false')
        }
    })
})

},

rollback: function(){
    range.addEventListener('input', function(e){
        rangeValue.textContent = e.target.value + '%'
        appData.rollback = e.target.value
            console.log(appData.rollback)
        }) 
      
       
},
  
    start: function() {
        appData.addScreens()
        appData.addServices()
        appData.addPrices()
        console.log(appData)
        appData.showResult()
		
		/* appData.addPrices()

		appData.showMessage()

		appData.logger()*/
	},
    showResult: function(){
        total.value = appData.screenPrice
        totalCountOther.value = appData.servicePricesPercent + appData.servicePricesNumber
        fullTotalCount.value = appData.fullPrice
        totalCountRollback.value = appData.fullPriceWithRollback
        totalCount.value = appData.screensCounter
    },
    addScreens: function(){
        screens = document.querySelectorAll('.screen')
        screens.forEach(function(screen, index){
        const select = screen.querySelector('select')
        const input = screen.querySelector('input')

  

        const selectName = select.options[select.selectedIndex].textContent
            appData.screens.push({
                id: index,
                name: selectName,
                price: +select.value * +input.value,
                count: input.value
                })
        })
        
    },
    addServices: function(){
        otherItemsPercent.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if(check.checked){
                appData.servicesPercent[label.textContent] = +input.value
            }
        })

        otherItemsNumber.forEach(function(item){
            const check = item.querySelector('input[type=checkbox]')
            const label = item.querySelector('label')
            const input = item.querySelector('input[type=text]')
            if(check.checked){
                appData.servicesNumber[label.textContent] = +input.value
            }
         
        })
       
    },

	addPrices: function() {
		for(let screen of appData.screens) {
			appData.screenPrice += +screen.price
		}
		for(let key in appData.servicesNumber) {
			appData.servicePricesNumber += appData.servicesNumber[key]
		}
        for(let key in appData.servicesPercent) {
			appData.servicePricesPercent += appData.screenPrice * (appData.servicesPercent[key] / 100)
		}
        appData.fullPrice = appData.screenPrice + appData.servicePricesPercent + appData.servicePricesNumber
        appData.fullPriceWithRollback = appData.fullPrice - (appData.fullPrice * appData.rollback / 100)
        for(let k of  appData.screens){
            appData.screensCounter += +k.count
            console.log(screensCounter)
            console.log(k.count)
        }
        
	},


	showMessage: function() {
		switch(true) {
			case appData.fullPrice > 30000:
				console.log('Даем скидку в 10%')
				break;
			case appData.fullPrice > 15000 && appData.fullPrice < 30000:
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
	
	logger: function() {
		console.log(appData.screens)
		console.log("Стоимость верстки экранов " + appData.screenPrice + ' рублей/ долларов/гривен/юани')
		console.log('Стоимость разработки сайта' + ' ' + appData.fullPrice + ' ' + 'рублей/ долларов/гривен/юани')
	},
	
}
appData.init()



