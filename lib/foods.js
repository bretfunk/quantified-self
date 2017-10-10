// This is the base url, last character is a "/" so don't include as first character
// of specific herokuUrl api request enpoint
// make requests with `herokuUrl + "api/v1/foods"` etc
const herokuUrl = require("./heroku-url")
const CruddyFood = require("./cruddy-food")
const HtmlEvents = require("./html-events")
const Filter = require("./filter")
const $ = require("jQuery")

class DefaultFoodLoader {
  constructor() {
    this.crud  = new CruddyFood()
    this.html  = new HtmlEvents()
    this.filter = new Filter()
  }

  getFoods() {
    $('#newFoodForm').hide()
    let page = this
    $.ajax({
      type: "GET",
      url: `${herokuUrl()}api/v1/foods`,
      success: function(posts) {
        page.launchPage(posts)
      }
    })
  }

  launchPage(posts) {
    this.html.fillTable(posts)
    this.filter.startListener("foods", this.filter)
    this.crud.startListener()
  }
}

$(document).ready(function() {
  const loadPage = new DefaultFoodLoader()
  loadPage.getFoods()
})

module.exports = DefaultFoodLoader
