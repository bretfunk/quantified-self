const herokuUrl = require("./heroku-url")
const CruddyFood = require("./cruddy-food")
const HtmlEvents = require("./html-events")
const Filter = require("./filter")
const $ = require("jQuery")

class DefaultLoader {

  constructor() {
    this.html  = new HtmlEvents()
    this.filter = new Filter()
    this.pageLauncher = {
      foods: function(data, model) {
        DefaultLoader.launchFoodPage(data, model)
      },
      meals: function(data, model) {
        DefaultLoader.launchMealPage(data, model)
      }
    }
  }

  static getJSON(modelString) {
    let mySelf = new DefaultLoader
    $(`#new${modelString}Form`).hide()
    $.ajax({
      type: "GET",
      url: `${herokuUrl()}api/v1/${modelString}`,
      success: function(data) {
        mySelf.launchPage(data, modelString)
      }
    })
  }

  foodsForShow(modelString) {
    let mySelf = this
    $(`#new${modelString}Form`).hide()
    $.ajax({
      type: "GET",
      url: `${herokuUrl()}api/v1/${modelString}`,
      success: function(data) {
        HtmlEvents.fillDisplayTable(data, modelString)
      }
    })
  }

  launchPage(data, model) {
    this.pageLauncher[model](data, model)
  }

  static launchFoodPage(data, model) {
    let crudFood  = new CruddyFood()
    HtmlEvents.fillTable(data, model)
    Filter.startListener(model)
    crudFood.startListener()
  }

  static launchMealPage(data, model) {
    let totals = {}
    let remainingCalories= {
      Breakfast: 400,
      Lunch: 600,
      Dinner: 800,
      Snack: 200
    }
    HtmlEvents.setFoods(data, totals)
    HtmlEvents.displayTotals(totals, remainingCalories)
    HtmlEvents.getTotals(remainingCalories, totals)
    let crud = new CruddyFood()
    crud.editFoodListener()
    crud.deleteMealFoodListener()
    let me = new DefaultLoader()
    me.foodsForShow("foods")
    $('.displayFoods').hide()
    Filter.calorieFilter("foods", me)
  }
}

module.exports = DefaultLoader
