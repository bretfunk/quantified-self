// This is the base url, last character is a "/" so don't include as first character
// of specific herokuUrl api request enpoint
const DefaultLoader = require("./default-loader")
const $ = require("jQuery")

class Meal {

  static loadPage(modelString) {
    let loader = new DefaultLoader()
    loader.getJSON(modelString)
  }
}

$(document).ready(function() {
  Meal.loadPage("meals")
})

module.exports = Meal
