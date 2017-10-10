// This is the base url
// make requests with `herokuUrl + "api/v1/foods"` etc
const herokuUrl = require("./heroku-url")
const $ = require("jQuery")
const food = require('./foods');


function getMeals() {
$.get(`${herokuUrl()}/api/v1/meals`)
  .then(function(meals) {
    meals.forEach(function(meal) {
      console.log(meal.name)
        meal.foods.forEach(function(food) {
          $(`.${meal.name}`).append(`<tr><td>${food.name}</td><td>${food.calories}</td>`)
          console.log(food.name)
          console.log(food.calories)

        })
    })
  })
  }
  getMeals()




