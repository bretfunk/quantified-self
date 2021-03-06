const $ = require("jQuery")
const mathHelper = require("./math-helpers")

class HtmlEvents {

  constructor() {
    this.mathHelper = new mathHelper()
  }

  static fillTable(foods, modelName) {
    foods.reverse().forEach(function(foodType){
      // event.preventDefault
        let button = `<td><button class='${modelName}DeleteButton deleteButton' id='${foodType.id}'>X</button></td>`
        let insertName   = `<tr id=${foodType.id}><td class="${modelName}" name="name" contentEditable>${foodType.name}</td>`
        let insertCals   = `<td class="${modelName}" name="calories" contentEditable>${foodType.calories}</td>`
        let insertRow    = `${insertName}${insertCals}${button}</tr>`
        $(`.${modelName}Table`).append(insertRow)
    })
  }

  static fillDisplayTable(foods, modelName) {
    foods.reverse().forEach(function(foodType){
      // event.preventDefault
        let insertName   = `<tr id=${foodType.id}><td class="${modelName}" name="name">${foodType.name}</td>`
        let insertCals   = `<td class="${modelName}" name="calories">${foodType.calories}</td>`
        let checkMark    = `<td><input type="checkbox" class="checkmark">`
        let insertRow    = `${insertName}${insertCals}${checkMark}</td></tr>`
        $(`.display${modelName}Table`).append(insertRow)
    })
  }

  static setFoods(meals, totals) {
    meals.forEach(function(meal) {
      HtmlEvents.fillTable(meal.foods, meal.name)
      HtmlEvents.setTotal(meal, totals)
      $(`.${meal.name}Table`).attr('id', `${meal.id}`)
      $(`.new${meal.name}`).attr('id', `${meal.id}`)
    })
  }

  static setTotal(meal, totals) {
    meal.foods.forEach(function(food){
      totals[meal.name] = totals[meal.name] || 0
      totals[meal.name] += food.calories
    })
  }

  static displayTotals(totals, remainingCalories) {
    Object.keys(totals).forEach(function(key){
      let calorieNumber = remainingCalories[key] - totals[key]
      $(`.${key}Table`).append(`<tr class='darkBackground'><td>Total Calories</td><td>${totals[key]}</td></tr>`)
      $(`.${key}Table`).append(`<tr class='darkBackground'><td>Remaining Calories</td><td style="color:${mathHelper.calorieColor(calorieNumber)}">${calorieNumber}</td></tr>`)
    })
  }

  static getTotals(goal, used) {
    let goalCalories = mathHelper.sum(goal)
    let caloriesConsumed = mathHelper.sum(used)
    let remainingCalories = goalCalories - caloriesConsumed
    $('.totals').append(`<tr><td>Goal Calories</td><td>${goalCalories}</td></tr>`)
    $('.totals').append(`<tr><td>Calories Consumed</td><td class="caloriesConsumed">${caloriesConsumed}</td></tr>`)
    $('.totals').append(`<tr><td>Remaining Calories</td><td style="color:${mathHelper.calorieColor(remainingCalories)}">${remainingCalories}</td></tr>`)

  }
}

module.exports = HtmlEvents
