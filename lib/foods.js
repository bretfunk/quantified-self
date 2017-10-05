// This is the base url, last character is a "/" so don't include as first character
// of specific herokuUrl api request enpoint
// make requests with `herokuUrl + "api/v1/foods"` etc
const herokuUrl = require("./heroku-url")
const $ = require("jQuery")

function getFoods() {
  counter = 1;
  $.ajax({
    type: "GET",
    url: herokuUrl() + "api/v1/foods",
    success: function(posts) {
      posts.forEach(function(foodType){
        event.preventDefault;
        let button = "<td><button type='button' class='deleteButton' id=`${counter}`>Delete</button></td>"
          let toInsert = `<tr><td>${foodType.name}</td><td>${foodType.calories}</td>${button}</tr>$`
          $(".foodsTable").append(toInsert);
        counter += 1;
      });
    }
  })
}


function deleteFoods() {
$('.deleteButton').on('click', function() {
  let id = event.target;
  console.log('delete button pressed');
  debugger;

$.ajax({
  type: 'DELETE',
  url: herokuUlr() + `api/v1/foods/#{.id}`
  })
});
};

getFoods();
deleteFoods();


module.exports = function() {
  getFoods: getFoods
  deleteFoods: deleteFoods
}
