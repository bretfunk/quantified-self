// This is the base url, last character is a "/" so don't include as first character
// of specific herokuUrl api request enpoint
// make requests with `herokuUrl + "api/v1/foods"` etc
const DefaultLoader = require("./default-loader")
const $ = require("jQuery")

class Food {
  static loadPage() {
    const loader = new DefaultLoader()
    loader.getJSON(loader, "foods")
    $(".checkmark").hide()
  }
}

$(document).ready(function() {
  Food.loadPage()
})

module.exports = Food
