const $ = require("jQuery")
const DefaultLoader = require("./default-loader")
const herokuUrl = require("./heroku-url")
const CruddyFood = require("./cruddy-food")
const HtmlEvents = require("./html-events")


class TableReloader {
  static reload(model) {
    $(`#new${model}Form`).hide()
    $.ajax({
      type: "GET",
      url: `${herokuUrl()}api/v1/${model}`,
      success: function(data) {
        TableReloader.launchMealPage(data, model)
      }
    })
  }

  static launchMealPage(data, model) {
    let totals = {}
    let remainingCalories= {
      Breakfast: 400,
      Lunch: 600,
      Dinner: 800,
      Snack: 200
    }
    TableReloader.removeTables()
    HtmlEvents.setFoods(data, totals)
    HtmlEvents.displayTotals(totals, remainingCalories)
    HtmlEvents.getTotals(remainingCalories, totals)
    let crud = new CruddyFood()
    crud.startListener()
  }

  static removeTables() {
    let meals = ["Breakfast", "Lunch", "Dinner", "Snack"]
    meals.forEach(function(meal) {
      $(`.${meal}Table`).empty()
    })
    $(".totals").empty()
  }
}

module.exports = TableReloader
