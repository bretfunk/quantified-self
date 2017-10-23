const $ = require("jQuery")
const herokuUrl = require("./heroku-url")
const DefaultLoader = require("./default-loader")
const HtmlEvents = require("./html-events")

class CruddyFood {
  constructor() {
    this.startListener = function() {
      this.deleteFoodListener()
      this.editFoodListener()
      this.createFoodButtonListener()
      this.createMealButtonListener()
    }
  }

  createFoodButtonListener() {
    $('#createButton').on('click', function() {
      $('#newfoodsForm').show()
      CruddyFood.createFoodFormListener()
    })
  }

  createMealButtonListener() {
    let meals = ["Breakfast", "Lunch", "Dinner", "Snack"]
    meals.forEach((meal) => {
      $(`.new${meal}`).on('click', function() {
        $('.displayFoods').show()
        $('.addToMeal').show()
        $(`.new${meal}`).css({ 'background-color': "yellow" })
        let mealId = $(this).attr("id")
        CruddyFood.getFoodsToAdd(mealId)
      })
    })
  }

  static getFoodsToAdd(mealId) {
    $('input:checkbox').change(function(){
      if($(this).is(':checked')){
        let foodId = $(this).parent().parent().attr("id")
        CruddyFood.addFoodToMeal(mealId, foodId)
      }
    })
  }

  static addFoodToMeal(mealId, foodId) {
    $.post(herokuUrl() + `api/v1/meals/${mealId}/foods/${foodId}`)
      .then((data) => {
        DefaultLoader.getJSON("meals")
      })
  }

  static createFoodFormListener() {
    $('#createFoodForm').on('submit', function(event) {
      event.preventDefault()

      let food = $(event.currentTarget.name).val()
      let calories = $(event.currentTarget.calories).val()

      CruddyFood.errorCheck(food, calories)

      let data = $.post(herokuUrl() + `api/v1/foods?name=${food}&calories=${calories}"`)

      .then(function(data) {
        let button = `<td><button class='foodsDeleteButton deleteButton' id='${data.id}'>Delete</button></td>`
        let toInsert = `<tr id=${data.id}><td>${food}</td><td>${calories}</td>${button}</tr>`
        $(".foodsTable").prepend(toInsert)
        $('#createFoodForm').hide()
      })
    })
   }

  editFoodListener(){
    let tables = ["foods", "Breakfast", "Lunch", "Dinner", "Snack"]
    tables.forEach(function(tableName){
      $(`.${tableName}Table`).on('keydown', `.${tableName}`, function(event) {
        const foodRow  = $(this).parent()
        const foodId   = foodRow.attr("id")
        const attrName = $(this).attr("name")
        const data     = { [attrName]: $(this).text() }

        if (event.keyCode === 13) {
          CruddyFood.ajaxPatchRequest(data, foodId)
          return false
        }
      deleteFoodListener()
      })
    })
  }

  static ajaxPatchRequest(data, foodId) {
    $.ajax({
      type: 'PATCH',
      url: `${herokuUrl()}api/v1/foods/${foodId}`,
      data: data,
      success: function() {
        alert("Successful")
      },
      error: function() {
        alert("Nope")
      }
    })
  }

  deleteFoodListener() {
    $('.foodsDeleteButton').on('click', function() {
      $.ajax({
        type: 'DELETE',
        url: herokuUrl() + `api/v1/foods/${event.target.id}`,
        success: $(`#${event.target.id}`).hide()
      })
    })
  }

  deleteMealFoodListener() {
    let meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack']
      meals.forEach(function(meal) {
    $(`.${meal}DeleteButton`).on('click', function() {
      let mealId = event.target.parentElement.parentElement.parentElement.id
      $.ajax({
        type: 'DELETE',
        url: herokuUrl() + `api/v1/meals/${mealId}/foods/${event.target.id}`,
        success: $(`#${event.target.id}`).hide()
      })
      })
    })
  }

  static errorCheck(food, calories) {
    if (!food) {
      $('#name-error').remove()
      throw new Error ($('#nameField').append("<p id='name-error' style='color:red;'>Please enter a food name</p>"))
      done()
    } else if (!calories || calories < 1) {
      $('#calorie-error').remove()
      throw new Error($('#calorieField').append("<p id='calorie-error' style='color:red;'>Please enter a calorie amount</p>"))
      done()
    }
  }
}


module.exports = CruddyFood
