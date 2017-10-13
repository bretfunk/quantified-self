// This is the base url, last character is a "/" so don't include as first character
// of specific herokuUrl api request enpoint
// make requests with `herokuUrl + "api/v1/meals"` etc
const DefaultLoader = require("./default-loader")
const $ = require("jQuery")

class Meal {
  constructor() {
    this.loadPage = function() {
      $(document).ready(function() {
        const loadPage = new DefaultLoader()
        loadPage.getMeals(loadPage)
        $(".checkmark").hide()
      })
    }
  }
}

const meal = new Meal()
meal.loadPage()

module.exports = Meal
