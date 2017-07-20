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

//THIS DONT WORK
var first_array = [1,2,3,4,5,6,7];
var second_array = [7,6,5,4,3,2,1];

var test = function(data,doneCallback){
  console.log("First data" + data);
  return doneCallback(null,data.first_data * data.second_data);
}

async.mapLimit({first_data: first_array,second_data: second_array}, 5, test, function(err,results){ //shit i was hoping this was gonna work
  console.log("Finished yo");
  console.log(results);
});
///

var first_arr = [1,2,3,4,5,6,7];
var second_arr = [7,6,5,4,3,2,1];

var test2 = function(data,doneCallback){
  console.log("data " + this.data);
  return doneCallback(null,data);
}

async.mapLimit(first_arr, 5, test2.bind({data: second_arr}), function(err,results){ //shit i was hoping this was gonna work
  console.log("Finished 2");
  console.log(results);
});