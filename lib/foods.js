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
      fillTable(posts)
      deleteFoodListener()
      editFoodListener()
      foodFilterListenter()
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

function editFoodListener(){
  $('.foodsTable').on('keydown', '.food', function(event) {
    const foodRow  = $(this).parent();
    const foodId   = foodRow.attr("id");
    const attrName = $(this).attr("name");
    const data     = { [attrName]: $(this).text() };

    if (event.keyCode === 13) {
      ajaxPatchRequest(data, foodId);
      return false;
    }
  })
}

function ajaxPatchRequest(data, foodId) {
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

function foodFilterListenter(){
  $(`.food-filter`).on('keydown', function(event) {
    let searchValue = $('.search-value').val().toLowerCase();
    $.ajax({
      type: 'GET',
      url: `${herokuUrl()}api/v1/foods`,
      success: function(posts) {
        appendFood(posts, searchValue)
      }
    });
  })
};

function appendFood(foods, searchValue) {
   let foodObjects = foods.filter(function(food) {
    return food.name.toLowerCase().includes(searchValue);
  })

  $('.food').remove()
  $('.deleteButton').hide()


  fillTable(foodObjects);
}

function fillTable(foods) {
  foods.reverse().forEach(function(foodType){
    event.preventDefault;
      let button = `<td><button type='button' class='deleteButton' id='${foodType.id}'>Delete</button></td>`
      let insertName   = `<tr id=${foodType.id}><td class="food" name="name" contentEditable>${foodType.name}</td>`
      let insertCals   = `<td class="food" name="calories" contentEditable>${foodType.calories}`
      let insertRow    = `${insertName}${insertCals}</td>${button}</tr>`
      $(".foodsTable").append(insertRow);
  })
}

getFoods();


module.exports = function() {
  getFoods: getFoods
}
