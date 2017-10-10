// This is the base url
// make requests with `herokuUrl + "api/v1/foods"` etc
const herokuUrl = require("./heroku-url")
const $ = require("jQuery")
const food = require('./foods');


function getMeals() {
  $.get(`${herokuUrl()}/api/v1/meals`)
    .then(function(meals) {
      meals.forEach(function(meal) {
        meal.foods.forEach(function(food) {
          let deleteButton = `<button type="button" value="Delete" class="deleteButton">Delete</button>
            $(`.${meal.name}`).prepend(`<tr><td>${food.name}</td><td>${food.calories}</td><td>${deleteButton}</td></tr>`)
        })
      })
    })
}
getMeals()




