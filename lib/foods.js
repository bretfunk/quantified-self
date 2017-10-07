// This is the base url, last character is a "/" so don't include as first character
// of specific herokuUrl api request enpoint
// make requests with `herokuUrl + "api/v1/foods"` etc
const herokuUrl = require("./heroku-url")
const $ = require("jQuery")

function getFoods() {
  //counter = 1;
  $.ajax({
    type: "GET",
    url: herokuUrl() + "api/v1/foods",
    success: function(posts) {
      posts.forEach(function(foodType){
        event.preventDefault;
        let button = `<td><button type='button' class='deleteButton' id='${foodType.id}'>Delete</button></td>`
          let toInsert = `<tr id=${foodType.id}><td>${foodType.name}</td><td>${foodType.calories}</td>${button}</tr>`;
          $(".foodsTable").append(toInsert);
      });
      deleteFoodListener();
      createFoodListener();
    }
  })
}


function deleteFoodListener() {
$('.deleteButton').on('click', function() {

$.ajax({
  type: 'DELETE',
  url: herokuUrl() + `api/v1/foods/${event.target.id}`,
  success: $(`#${event.target.id}`).hide()
  });
});
};

function createFoodListener() {
  $('#createButton').on('click', function() {
    debugger;
    $.post(herokuUrl() + "api/v1/foods")
    .then(function(newFood) {
        let button = `<td><button type='button' class='deleteButton' id='${foodType.id}'>Delete</button></td>`
          let toInsert = `<tr id=${newFood.id}><td>${newFood.name}</td><td>${newFood.calories}</td>${button}</tr>`;
          $(".foodsTable").append(toInsert);
      });
  });
};



getFoods();


module.exports = function() {
  getFoods: getFoods
}
