// This is the base url, last character is a "/" so don't include as first character
// of specific herokuUrl api request enpoint
// make requests with `herokuUrl + "api/v1/foods"` etc
const herokuUrl = require("./heroku-url")
const $ = require("jQuery")

//$('#newFoodForm').hide();
$('#newFoodForm').hide();

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
      createFoodButtonListener();
      createFoodFormListener();

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

function createFoodButtonListener() {
  $('#createButton').on('click', function() {
    $('#newFoodForm').show();
  });
};

function createFoodFormListener() {
  $('#createFoodForm').on('submit', function(event) {
    event.preventDefault();

    let food = $(event.currentTarget.name).val();
    let calories = $(event.currentTarget.calories).val();
    if (!food) {
      throw new Error ($('#nameField').append("Please enter a food name"));
    }

    if (!calories || calories < 1) {
      throw new Error($('#calorieField').append("Please enter a calorie amount"));
    };

    let data = $.post(herokuUrl() + `api/v1/foods?name=${food}&calories=${calories}"`)
      .then(function(data) {
        let button = `<td><button type='button' class='deleteButton' id='${data.id}'>Delete</button></td>`
          let toInsert = `<tr id=${data.id}><td>${food}</td><td>${calories}</td>${button}</tr>`;
        $(".foodsTable").prepend(toInsert);
      });
  });
};



getFoods();


module.exports = function() {
  getFoods: getFoods
}
