const $ = require("jQuery")

class HtmlEvents {

  fillTable(foods) {
    foods.reverse().forEach(function(foodType){
      event.preventDefault
        let button = `<td><button type='button' class='deleteButton' id='${foodType.id}'>Delete</button></td>`
        let insertName   = `<tr id=${foodType.id}><td class="foods" name="name" contentEditable>${foodType.name}</td>`
        let insertCals   = `<td class="foods" name="calories" contentEditable>${foodType.calories}`
        let insertRow    = `${insertName}${insertCals}</td>${button}</tr>`
        $(".foodsTable").append(insertRow)
    })
  }
}

module.exports = HtmlEvents
