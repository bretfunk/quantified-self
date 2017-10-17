class mathHelper {
  static sum( obj ) {
    return Object.keys( obj )
      .reduce( function( sum, key ){
        return sum + parseFloat( obj[key] );
      }, 0 );
  }

  static calorieColor(number) {
    if (number < 0) {
      return 'red'
    } else {
      return 'green'
    }
  }
}


module.exports = mathHelper
