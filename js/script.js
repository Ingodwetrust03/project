"use strict"
const title = document.getElementsByTagName('h1')[0]
const startBtn = document.getElementsByClassName('handler_btn')[0]
let screens = document.querySelectorAll('.screen')
let screensFirst = document.querySelector('.screen:first-child')
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
let screensCounter
let leftBlock = document.querySelector('.main-controls')
let resetBtn = document.getElementById('reset')
let totalBlockInputs = document.querySelectorAll('.main-total input[type=text]')
let cmsCheckBox = document.getElementById('cms-open')
let cmsVariants = document.querySelector('.hidden-cms-variants')
let checkboxes = document.querySelectorAll('input[type=checkbox]')
let cmsOptionOther = document.getElementById('cms-other-input')
let screensBlock = document.querySelector('.main-controls__views:first-child')

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
	fullPriceWithCmsPercent: 0,
	screensCounter: 0,
	rollback: 0,
	cmsOptionOtherValue: 0,


	init: function() {
		startBtn.disabled = true
		this.addTitle()
		this.check()
		this.openCMS()
		this.rollbackCounter()
		startBtn.addEventListener('mouseenter', this.check)
		startBtn.addEventListener('click', () => {
			this.start()
			this.disableInputs()
		})
		resetBtn.addEventListener('click', () => {
			this.reset()
		})
		buttonPlus.addEventListener('click', this.addScreenBlock)
	},

    
	addScreenBlock: function() {
		if(screens.length <= 18){
			screens = document.querySelectorAll('.screen')
			const cloneScreen = screens[screens.length - 1].cloneNode(true)
			cloneScreen.classList.add('clone')
			screens[screens.length - 1].after(cloneScreen)
		} else {
			buttonPlus.disabled = true
		}
		
	},
	addTitle: function() {
		document.title = title.textContent
	},
	check: function() {
		let firstElementBlock = document.querySelectorAll('.element')[0]
		let firstElementBlockInputsArr = firstElementBlock.querySelectorAll('input')
		let firstElementBlockSelectsArr = firstElementBlock.querySelectorAll('select')
		let screensInputsArray = [...firstElementBlockInputsArr, ...firstElementBlockSelectsArr]
		screensInputsArray.forEach((item) => {
			item.addEventListener('input', () => {
				if(!item.value.trim()) {
					startBtn.disabled = true
				} else {
					startBtn.disabled = false
				}
			})
		})
		const checkOnBtnHover = () => {
			for(let key of screensInputsArray) {
				if(!key.value.trim() || key.value === undefined) {
					startBtn.disabled = true
				}
			}
		}
		checkOnBtnHover()
	},
	disableInputs: function() {
		buttonPlus.disabled = true
		let cmsVariantsInputs = cmsVariants.querySelectorAll('input, select')
		cmsVariantsInputs.forEach((item) => {
			item.disabled = true
		})
		checkboxes.forEach((item) => {
			item.disabled = true
		})
		screens.forEach((screen) => {
			let screenInputs = screen.querySelectorAll('input[type=text], select')
			screenInputs.forEach((input) => {
				input.disabled = true
				startBtn.style.display = 'none'
				resetBtn.style.display = 'flex'
			})
		})
	},
	reset: function() {
		buttonPlus.disabled = false
		checkboxes.forEach((checkbox) => {
			checkbox.checked = false
		})
		cmsVariants.style.display = 'none'
		cmsOptionOther.disabled = false
		cmsOptionOther.value = ''
		let cmsVariantsInputs = cmsVariants.querySelectorAll('input, select')
		cmsVariantsInputs.forEach((item) => {
			item.disabled = false
		})

		for (let i=1; i <= screens.length; i++){
			console.log(screens[i])
			if (!screens[i]) {
				continue
			}
			 screens[i].remove()
			} 

			screensBlock.querySelector('input').disabled = false
			screensBlock.querySelector('input').value = ''
			let screenSelect = screensBlock.querySelector('select')
			screenSelect.disabled = false
			screenSelect.selectedIndex = 0
			
		totalBlockInputs.forEach((item) => {
			item.value = ''
		})
		
		this.screens.length = ''
		totalCount.value = ''
		this.screensCounter = 0
		this.screenPrice = 0

		console.log(totalCount.value)
		console.log(appData)

		startBtn.style.display = 'flex'
		resetBtn.style.display = 'none'
	},
	rollbackCounter: function() {
		range.addEventListener('input', (e) => {
			rangeValue.textContent = e.target.value + '%'
			this.rollback = e.target.value
			if(!totalCountRollback.value == 0) {
				totalCountRollback.value = this.fullPrice - (this.fullPrice * this.rollback / 100)
			}
		})
	},
	openCMS: function() {
		console.log(cmsCheckBox)
		cmsCheckBox.addEventListener('change', () => {
			if(cmsCheckBox.checked) {
				cmsVariants.style.display = 'flex'
			} else {
				cmsVariants.style.display = 'none'
			}
		})
		let cmsVariantsSelect = cmsVariants.querySelector('select')
		cmsVariantsSelect.addEventListener('input', () => {
			let cmsVariantsSelectName = cmsVariantsSelect.options[cmsVariantsSelect.selectedIndex]
			if(cmsVariantsSelectName.value == 'other') {
				cmsVariants.querySelector('.main-controls__input').style.display = 'flex'
			}
		})
	},
	start: function() {
		appData.addScreens()
		appData.addServices()
		appData.addPrices()
		appData.openCMS()
		appData.showResult()
	},
	showResult: function() {
		total.value = this.screenPrice
		totalCountOther.value = this.servicePricesPercent + this.servicePricesNumber
		fullTotalCount.value = this.fullPriceWithCmsPercent
		totalCountRollback.value = this.fullPriceWithRollback
		totalCount.value = this.screensCounter
	},
	addScreens: function() {
		screens = document.querySelectorAll('.screen')

		screens.forEach((screen, index) => {
			const select = screen.querySelector('select')
			const input = screen.querySelector('input')
			const selectName = select.options[select.selectedIndex].textContent
			this.screens.push({
				id: index,
				name: selectName,
				price: +select.value * +input.value,
				count: +input.value
			})
		})
	},
	addServices: function() {
		otherItemsPercent.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]')
			const label = item.querySelector('label')
			const input = item.querySelector('input[type=text]')
			if(check.checked) {
				this.servicesPercent[label.textContent] = +input.value
			}
		})
		otherItemsNumber.forEach((item) => {
			const check = item.querySelector('input[type=checkbox]')
			const label = item.querySelector('label')
			const input = item.querySelector('input[type=text]')
			if(check.checked) {
				this.servicesNumber[label.textContent] = +input.value
			}
		})
	},
	addPrices: function() {
		for(let screen of this.screens) {
			this.screenPrice += +screen.price
		}
		for(let key in this.servicesNumber) {
			this.servicePricesNumber += this.servicesNumber[key]
		}
		for(let key in this.servicesPercent) {
			this.servicePricesPercent += this.screenPrice * (this.servicesPercent[key] / 100)
		}
		this.fullPrice = this.screenPrice + this.servicePricesPercent + this.servicePricesNumber
		this.fullPriceWithCmsPercent = this.fullPrice + this.fullPrice * (+cmsOptionOther.value / 100)
		this.fullPriceWithRollback = this.fullPriceWithCmsPercent - (this.fullPriceWithCmsPercent * this.rollback / 100)
		
		for(let screen of this.screens) {
			this.screensCounter += +screen.count
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
