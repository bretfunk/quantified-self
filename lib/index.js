// This is the base url
// make requests with `herokuUrl + "api/v1/foods"` etc
const herokuUrl = require("./heroku-url")
const $ = require("jQuery")
const food = require('./foods');


function getMeals() {
  $.get(`${herokuUrl()}/api/v1/meals`)
    .then(function(meals) {
      let totals = {}
      let remainingCalories= {
        Breakfast: 400,
        Lunch: 600,
        Dinner: 800,
        Snack: 200
      }
      //foods is nested under meals so there is a forEach inside a forEach to get the foods and calories
      meals.forEach(function(meal) {
        meal.foods.forEach(function(food) {
          let deleteButton = `<button type="button" value="Delete" class="deleteButton">Delete</button>`
            $(`.${meal.name}`).prepend(`<tr><td>${food.name}</td><td>${food.calories}</td><td>${deleteButton}</td></tr>`)
            totals[meal.name] = totals[meal.name] || 0
            totals[meal.name] += food.calories
        })
      })
      //add total calories and calories remaining to each table
      Object.keys(totals).forEach(function(key){
        let calorieNumber = remainingCalories[key] - totals[key]
          //calorieColor(calorieNumber)

        //add the calories in red if negative
        $(`.${key}`).append(`<tr><td>Total Calories</td><td>${totals[key]}</td></tr>`)
          $(`.${key}`).append(`<tr><td>Remaining Calories</td><td style="color:${calorieColor(calorieNumber)}">${calorieNumber}</td></tr>`)

      })
          getTotals(remainingCalories, totals)
    })
}


function getTotals(goal, used) {
  let goalCalories = sum(goal)
  let caloriesConsumed = sum(used)
  let remainingCalories = goalCalories - caloriesConsumed
  $('.totals').append(`<tr><td>Goal Calories</td><td>${goalCalories}</td></tr>`)
  $('.totals').append(`<tr><td>Calories Consumed</td><td>${caloriesConsumed}</td></tr>`)
  $('.totals').append(`<tr><td>Remaining Calories</td><td style="color:${calorieColor(remainingCalories)}">${remainingCalories}</td></tr>`)

}

function sum( obj ) {
  return Object.keys( obj )
    .reduce( function( sum, key ){
      return sum + parseFloat( obj[key] );
    }, 0 );
}

function calorieColor(number) {
  if (number < 0) {
    return 'red'
  } else {
    return 'green'
  }
}

getMeals()




