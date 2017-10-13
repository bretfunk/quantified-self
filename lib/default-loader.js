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

  getFoods(thisPage) {
    $('#newFoodForm').hide()
    $.ajax({
      type: "GET",
      url: `${herokuUrl()}api/v1/foods`,
      success: function(foods) {
        thisPage.launchFoodPage(foods, "foods")
      }
    })
  }

  getMeals(thisPage) {
    $.get(`${herokuUrl()}api/v1/meals`)
     .then(function(meals) {
       thisPage.launchMealPage(meals)
    })
  }


  launchPage(posts, model) {
    model === "foods" ? launchFoodPage(posts, model) : launchMealPage(posts, model)
  }

  launchFoodPage(posts, tableType) {
    this.html.fillTable(posts, "foods")
    this.filter.startListener(tableType, this.filter)
    this.crudFood.startListener()
  }

  launchMealPage(meals) {
    let totals = {}
    let remainingCalories= {
      Breakfast: 400,
      Lunch: 600,
      Dinner: 800,
      Snack: 200
    }
    this.html.setFoods(meals, totals)
    this.html.displayTotals(totals, remainingCalories)
    this.html.getTotals(remainingCalories, totals)
  }
}

module.exports = DefaultLoader
