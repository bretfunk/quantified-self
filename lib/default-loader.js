const herokuUrl = require("./heroku-url")
const CruddyFood = require("./cruddy-food")
const HtmlEvents = require("./html-events")
const Filter = require("./filter")
const $ = require("jQuery")

class DefaultLoader {
  constructor() {
    this.crudFood  = new CruddyFood()
    this.html  = new HtmlEvents()
    this.filter = new Filter()
  }

  getJSON(thisPage, modelString) {
    $(`#new${modelString}Form`).hide()
    $.ajax({
      type: "GET",
      url: `${herokuUrl()}api/v1/${modelString}`,
      success: function(arrayOfModels) {
        thisPage.launchPage(arrayOfModels, modelString, thisPage)
      }
    })
  }

  launchPage(posts, model, thisPage) {
    model === "foods" ? thisPage.launchFoodPage(posts, model) : thisPage.launchMealPage(posts, model)
  }

  launchFoodPage(posts, tableType) {
    HtmlEvents.fillTable(posts, "foods")
    Filter.startListener(tableType, this.filter)
    this.crudFood.startListener()
    $(".checkmark").hide()
  }

  launchMealPage(meals, model) {
    let totals = {}
    let remainingCalories= {
      Breakfast: 400,
      Lunch: 600,
      Dinner: 800,
      Snack: 200
    }
    HtmlEvents.setFoods(meals, totals)
    HtmlEvents.displayTotals(totals, remainingCalories)
    HtmlEvents.getTotals(remainingCalories, totals)
  }
}

module.exports = DefaultLoader
