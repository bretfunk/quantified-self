const $ = require("jQuery")
const herokuUrl = require("./heroku-url")

class CruddyFood {
  constructor() {
    this.startListener = function() {
      this.deleteFoodListener()
      this.editFoodListener()
      this.createFoodButtonListener(this)
    }
  }

  createFoodButtonListener(myPage) {
    $('#createButton').on('click', function() {
      $('#newFoodForm').show()
      myPage.createFoodFormListener(myPage)
    })
  }

  createFoodFormListener(myPage) {
    $('#createFoodForm').on('submit', function(event) {
      event.preventDefault()

      let food = $(event.currentTarget.name).val()
      let calories = $(event.currentTarget.calories).val()

      myPage.errorCheck(food, calories)

      let data = $.post(herokuUrl() + `api/v1/foods?name=${food}&calories=${calories}"`)

      .then(function(data) {
        let button = `<td><button type='button' class='deleteButton' id='${data.id}'>Delete</button></td>`
        let toInsert = `<tr id=${data.id}><td>${food}</td><td>${calories}</td>${button}</tr>`
        $(".foodsTable").prepend(toInsert)
        $('#createFoodForm')[0].reset()
      })
    })
   }

  editFoodListener(){
    $('.foodsTable').on('keydown', '.food', function(event) {
      const foodRow  = $(this).parent()
      const foodId   = foodRow.attr("id")
      const attrName = $(this).attr("name")
      const data     = { [attrName]: $(this).text() }

      if (event.keyCode === 13) {
        this.ajaxPatchRequest(data, foodId)
        return false
      }
    })
  }

  ajaxPatchRequest(data, foodId) {
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
  $('.deleteButton').on('click', function() {
    $.ajax({
      type: 'DELETE',
      url: herokuUrl() + `api/v1/foods/${event.target.id}`,
      success: $(`#${event.target.id}`).hide()
      })
    })
  }

  errorCheck(food, calories) {
    //let words = [food, calories]
      //let toSay = {
        //food: "food name",
        //calories: "calorie amount"
      //}

    //words.forEach(function(input, index) {
      //let word = ["food", "calories"]
      //if (!`${input}`) {
        //$(`${word[index]}-error`).remove()
        //throw new Error ($(`#${word[index]}Field`).append(`<p id=``${word[index]}-error``>Please enter a ${toSay[word[index]]} </p>`))
      //}
    //})

    if (!food) {
      $('#name-error').remove()
      throw new Error ($('#nameField').append("<p id='name-error'>Please enter a food name</p>"))
    } else if (!calories || calories < 1) {
      $('#calorie-error').remove()
      throw new Error($('#calorieField').append("<p id='calorie-error'>Please enter a calorie amount</p>"))
    }
  }
}


module.exports = CruddyFood
