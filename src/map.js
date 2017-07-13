var async = require('async');
var request = require('request');

var square = function (num, doneCallback) {
  // Call back with no error and the result of num * num
  return doneCallback(null, num * num);
};

var circle = function(num, doneCallback){
	return doneCallback(null, num * 3.14);
};


// Square each number in the array [1, 2, 3, 4]
async.map([1, 2, 3, 4], square, function (err, results) {
	async.map([1, 2, 3, 4], circle, function (err, results) {
		console.log("Finished circle");
		console.log(results);
	});
  // Square has been called on each of the numbers
  // so we're now done!
  console.log("Finished!");
  console.log(results);
});

/*

Output should be :: 
Finished!
[ 1, 4, 9, 16 ]

*/