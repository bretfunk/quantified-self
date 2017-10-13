// This is the base url, last character is a "/" so don't include as first character
// of specific herokuUrl api request enpoint
// make requests with `herokuUrl + "api/v1/foods"` etc
const DefaultLoader = require("./default-loader")
const $ = require("jQuery")

class Food {
  constructor() {
    this.loadPage = function() {
      $(document).ready(function() {
        const loadPage = new DefaultLoader()
        loadPage.getFoods(loadPage)
        $(".checkmark").hide()
      })
    }
  }
}

const food = new Food()
food.loadPage()

module.exports = Food
