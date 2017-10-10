const herokuUrl = require("./heroku-url")
const CruddyFood = require("./cruddy-food")
const HtmlEvents = require("./html-events")
const Filter = require("./filter")
const $ = require("jQuery")

class DefaultLoader {
  constructor() {
    this.crud  = new CruddyFood()
    this.html  = new HtmlEvents()
    this.filter = new Filter()
  }

  getFoods(thisPage) {
    $('#newFoodForm').hide()
    $.ajax({
      type: "GET",
      url: `${herokuUrl()}api/v1/foods`,
      success: function(posts) {
        thisPage.launchPage(posts, "foods")
      }
    })
  }

  launchPage(posts, tableType) {
    this.html.fillTable(posts)
    this.filter.startListener(tableType, this.filter)
    this.crud.startListener()
  }
}

module.exports = DefaultLoader
