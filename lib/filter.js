const $ = require("jQuery")
const herokuUrl = require("./heroku-url")
const HtmlEvents = require("./html-events")
const DefaultLoader = require("./default-loader")

class Filter {
  constructor() {
    this.html = new HtmlEvents(),
    this.calFilter = {
      0: function(Obj, modelName) {
        HtmlEvents.fillDisplayTable(Obj.reverse(), modelName)
        $('.calorieButton').attr('id', '1')
      },
      1: function(Obj, modelName) {
        HtmlEvents.fillDisplayTable(Obj, modelName)
        $('.calorieButton').attr('id', '2')
      },
      2: function(Obj, modelName, loader) {
        event.preventDefault()
        loader.foodsForShow(modelName)
        $('.calorieButton').attr('id', '0')
      }
    }
  }

  static startListener(model){
    $(`.${model}-filter`).on('keydown', function(event) {
      let searchValue = $('.search-value').val().toLowerCase()
      $.ajax({
        type: 'GET',
        url: `${herokuUrl()}api/v1/${model}`,
        success: function(posts) {
          Filter.appendTable(posts, searchValue, model)
        }
      })
    })
  }

  static calorieFilter(model, loader) {
    $('.calorieButton').on('click', function(event) {
      let counter = $(this).attr("id")
      $.ajax({
        type: 'GET',
        url: `${herokuUrl()}api/v1/${model}`,
        success: function(posts) {
          Filter.sortCalories(posts, model, counter, loader)
        }
      })
    })
  }

  static appendTable(array, searchValue, model) {
     let Objects = array.filter(function(obj) {
      return obj.name.toLowerCase().includes(searchValue)
    })

    $(`.${model}Table`).find("tr").remove()
    $('.deleteButton').hide()
    $(".checkmark").hide()

    HtmlEvents.fillTable(Objects, model)
  }

  static sortCalories(data, model, counter, loader) {
    let foods = data.sort(function(obj1, obj2) {
      return parseFloat(obj1.calories) - parseFloat(obj2.calories)
    })
    $(`.display${model}Table`).find("tr").remove()
    let filt = new Filter()
    filt.calFilter[counter](foods, model, loader)
  }
}

module.exports = Filter
