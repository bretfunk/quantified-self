const $ = require("jQuery")
const DefaultLoader = require("./default-loader")

class pageReloader {
  static reload(model) {
    let loader = new DefaultLoader
    $(`#new${modelString}Form`).hide()
    $.ajax({
      type: "GET",
      url: `${herokuUrl()}api/v1/${modelString}`,
      success: function(data) {
        debugger
        // loader.launchPage(data, modelString)
      }
    })
  }
}

module.exports = pageReloader
