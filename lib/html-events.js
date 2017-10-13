const $ = require("jQuery")

class HtmlEvents {

  fillTable(foods, modelName) {
    foods.reverse().forEach(function(foodType){
      // event.preventDefault
        let button = `<td><button type='button' class='deleteButton' id='${foodType.id}'>Delete</button></td>`
        let insertName   = `<tr id=${foodType.id}><td class="${modelName}" name="name" contentEditable>${foodType.name}</td>`
        let insertCals   = `<td class="${modelName}" name="calories" contentEditable>${foodType.calories}</td>`
        let checkMark    = `<td><input type="checkbox" class="checkmark">`
        let insertRow    = `${insertName}${insertCals}${checkMark}</td>${button}</tr>`
        $(`.${modelName}Table`).append(insertRow)
    })
  }

  setFoods(meals, totals) {
    meals.forEach(function(meal) {
      fillTable(meal.foods, meal.name)
      setTotal(meal, totals)
    })
  }

  setTotal(meal, totals) {
    meal.foods.forEach(function(food){
      totals[meal.name] = totals[meal.name] || 0
      totals[meal.name] += food.calories
    })
  }

  displayTotals(totals, remainingCalories) {
    Object.keys(totals).forEach(function(key){
      let calorieNumber = remainingCalories[key] - totals[key]
      $(`.${key}Table`).append(`<tr class='darkBackground'><td>Total Calories</td><td>${totals[key]}</td></tr>`)
      $(`.${key}Table`).append(`<tr class='darkBackground'><td>Remaining Calories</td><td style="color:${calorieColor(calorieNumber)}">${calorieNumber}</td></tr>`)
    })
  }

  getTotals(goal, used) {
    let goalCalories = sum(goal)
    let caloriesConsumed = sum(used)
    let remainingCalories = goalCalories - caloriesConsumed
    $('.totals').append(`<tr><td>Goal Calories</td><td>${goalCalories}</td></tr>`)
    $('.totals').append(`<tr><td>Calories Consumed</td><td>${caloriesConsumed}</td></tr>`)
    $('.totals').append(`<tr><td>Remaining Calories</td><td style="color:${calorieColor(remainingCalories)}">${remainingCalories}</td></tr>`)

  }

  sum( obj ) {
    return Object.keys( obj )
      .reduce( function( sum, key ){
        return sum + parseFloat( obj[key] );
      }, 0 );
  }

  calorieColor(number) {
    if (number < 0) {
      return 'red'
    } else {
      return 'green'
    }
  }
}

module.exports = HtmlEvents
