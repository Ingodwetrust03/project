"use strict"

const appData = {
	rollback: 25,
	title: '',
	screens: [],
	screenPrice: 0,
	servicePercentPrice: 0,
	allServicePrices: 0,
	services: {},
	adaptive: true,
	fullPrice: 0,
	getScreenPrice: '',
	getAddServiceSum: 0,
	logMessage: '',
	bigFirstLetter: [],
	titleArrayToString: '',
	titleToLow: '',
	titleArray: [],
	isNumber: function(num) {
		return !isNaN(parseFloat(num)) && isFinite(num)
	},
	questions: function() {
		do {
			appData.title = prompt('Как называется ваш проект?', 'Калькулятор верстки')
		} while (appData.isNumber(appData.title))
		for(let i = 0; i < 2; i++) {
			let name
			do {
				name = prompt('Какие типы экранов нужно разработать?')
			} while (appData.isNumber(name))
			let price = 0
			do {
				price = prompt('Сколько будет стоить данная работа?')
			} while (!appData.isNumber(price))
			appData.screens.push({
				id: i,
				name: name + '_id' + i,
				price: price
			})
		}
		for(let i = 0; i < 2; i++) {
			let name
			do {
				name = prompt('Какой дополнительный тип услуги нужен?')
			} while (appData.isNumber(name))
			let price = 0
			do {
				price = prompt('Сколько будет стоить данная работа?')
			} while (!appData.isNumber(price))
			appData.services[name] = +price
		}
		appData.adaptive = confirm('Нужен ли адаптив на сайте?')
	},
	addPrices: function() {
		/*appData.screenPrice = appData.screens.reduce(function(){
		    return  appData.screenPrice += +appData.screens.price
		}, 0)*/
		for(let screen of appData.screens) {
			appData.screenPrice += +screen.price
		}
		for(let key in appData.services) {
			appData.allServicePrices += appData.services[key]
		}
	},
	getFullPrice: function() {
		appData.fullPrice = appData.getScreenPrice + appData.allServicePrices
	},
	getServicePercentPrices: function() {
		appData.servicePercentPrice = parseFloat(appData.fullPrice - (appData.fullPrice * (appData.rollback / 100)))
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
	getTitle: function() {
		appData.titleToLow = appData.title.toLowerCase()
		appData.titleArray = appData.titleToLow.split("")

		function makeBigFirstLetter() {
			appData.bigFirstLetter = appData.titleArray[0].toUpperCase()
			appData.titleArray.shift();
			appData.titleArray.unshift(appData.bigFirstLetter)
			appData.titleArrayToString = appData.titleArray.join('')
			appData.title = appData.titleArrayToString
			appData.title = appData.title
		}
		if(appData.titleArray[0] == ' ') {
			appData.titleArray.splice(0, 1)
			makeBigFirstLetter()
		} else {
			makeBigFirstLetter()
		}
	},
	logger: function() {
		console.log(appData.screens)
		console.log("Стоимость верстки экранов " + appData.screenPrice + ' рублей/ долларов/гривен/юани')
		console.log('Стоимость разработки сайта' + ' ' + appData.fullPrice + ' ' + 'рублей/ долларов/гривен/юани')
	},
	start: function() {
		appData.questions()
		appData.addPrices()
		appData.getFullPrice()
		appData.getServicePercentPrices()
		appData.showMessage()
		appData.getTitle()
		appData.logger()
	},
}
appData.start()



