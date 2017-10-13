// This is the base url, last character is a "/" so don't include as first character
// of specific herokuUrl api request enpoint
const DefaultLoader = require("./default-loader")
const $ = require("jQuery")

class Meal {
  constructor() {
    this.loadPage = function() {
      const loadPage = new DefaultLoader()
      loadPage.getJSON(loadPage, "meals")
      $(".checkmark").hide()
    }
  }
}

$(document).ready(function() {
  const meal = new Meal()
  meal.loadPage()
})

module.exports = Meal
