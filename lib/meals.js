// This is the base url, last character is a "/" so don't include as first character
// of specific herokuUrl api request enpoint
const DefaultLoader = require("./default-loader")
const $ = require("jQuery")

class Meal {
  static loadPage() {
    const loader = new DefaultLoader()
    loader.getJSON(loader, "meals")
    $(".checkmark").hide()
  }
}

$(document).ready(function() {
  Meal.loadPage()
})

module.exports = Meal
