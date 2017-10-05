// This is the base url
// make requests with `herokuUrl + "api/v1/foods"` etc
const herokuUrl = require("./heroku-url")
var newAlert = require('./foods');
console.log(newAlert());
let fullUrl = herokuUrl() + "test";
console.log(fullUrl);

