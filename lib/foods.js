// This is the base url, last character is a "/" so don't include as first character
// of specific herokuUrl api request enpoint
// make requests with `herokuUrl + "api/v1/foods"` etc
const herokuUrl = require("./heroku-url")
const $ = require("jQuery")

function getFoods() {
  $.ajax({
    type: "GET",
    url: herokuUrl() + "api/v1/foods",
    success: function(posts) {
      posts.forEach(function(foodType){
        event.preventDefault;
        let button = "<td><button type='button' class='deleteButton'>Delete</button></td>"
        let toInsert = `<tr><td>${foodType.name}</td><td>${foodType.calories}</td>${button}</tr>$`
        $(".foodsTable").append(toInsert);
      });
    }
  })
}

getFoods();

module.exports = function() {
  getFoods: getFoods
}
