const $ = require("jQuery")
const herokuUrl = require("./heroku-url")
const HtmlEvents = require("./html-events")

class Filter {
  constructor() {
    this.html = new HtmlEvents()
  }

  startListener(model, thisFilter){
    $(`.${model}-filter`).on('keydown', function(event) {
      let searchValue = $('.search-value').val().toLowerCase()
      $.ajax({
        type: 'GET',
        url: `${herokuUrl()}api/v1/${model}`,
        success: function(posts) {
          thisFilter.appendFood(posts, searchValue)
        }
      })
    })
  }

  appendFood(foods, searchValue) {
     let foodObjects = foods.filter(function(food) {
      return food.name.toLowerCase().includes(searchValue)
    })

    $('.food').remove()
    $('.deleteButton').hide()

    let html = new HtmlEvents()
    html.fillTable(foodObjects)
  }
}

module.exports = Filter
