const $ = require("jQuery")
const herokuUrl = require("./heroku-url")
const HtmlEvents = require("./html-events")

class Filter {
  constructor() {
    this.html = new HtmlEvents()
  }

  static startListener(model, thisFilter){
    $(`.${model}-filter`).on('keydown', function(event) {
      let searchValue = $('.search-value').val().toLowerCase()
      $.ajax({
        type: 'GET',
        url: `${herokuUrl()}api/v1/${model}`,
        success: function(posts) {
          thisFilter.appendTable(posts, searchValue, model)
        }
      })
    })
  }

  appendTable(array, searchValue, model) {
     let Objects = array.filter(function(obj) {
      return obj.name.toLowerCase().includes(searchValue)
    })

    $(`.${model}`).remove()
    $('.deleteButton').hide()

    let html = new HtmlEvents()
    html.fillTable(Objects, model)
  }
}

module.exports = Filter
