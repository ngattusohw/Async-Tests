// Include the async package
// Make sure you add "async" to your package.json
var async = require("async");
var request = require("request");
require("./mutex.js");

var mutex = new Mutex();

// // 1st para in async.each() is the array of items
// async.each(items,
//   // 2nd param is the function that each item is passed to
//   function(item, callback){
//     // Call an asynchronous function, often a save() to DB
//     item.someAsyncCall(function (){
//       // Async call is done, alert via callback
//       callback();
//     });
//   },
//   // 3rd param is the function to call when everything's done
//   function(err){
//     // All tasks are done now
//     doSomethingOnceAllAreDone();
//   }
// );


//https://httpbin.org/get

//example of how to use mutex lock

mutex.enqueue(function(callback) {init_query(() => {console.log('called 1'); callback()})});
mutex.enqueue(function(callback) {setTimeout(() => {console.log('called 2'); callback()}, 500)});


var holder = [];

var square = function (num, doneCallback) {
  //console.log(num * num);

  request({
	    url: "https://httpbin.org/get",
	    json: true,
	    headers: {
	            "accept": "application/json",
	            "Content-Type": "application/json",
	            "accept-language": "en-US,en;q=0.8",
	            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
	    }
    },  function (error, response, body) {
            if (!error && response.statusCode === 200) {
            	console.log(num + " " + body);
            	// Nothing went wrong, so callback with a null error.
              if(num != 2){
                holder.push(num);
                return doneCallback(null);
              }else{
                request({
                  url: "https://httpbin.org/get",
                  json: true,
                  headers: {
                          "accept": "application/json",
                          "Content-Type": "application/json",
                          "accept-language": "en-US,en;q=0.8",
                          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
                  }
                },function(error, response, body){
                    num = 600;
                    holder.push(num);
                    return doneCallback(null);
                });
              }
            }else{
            	return doneCallback("error")
            }
        });



};

function init_query(callback){
  request({
        url: "https://httpbin.org/get",
        json: true,
        headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "accept-language": "en-US,en;q=0.8",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }
      },  function (error, response, body) {

              // Square each number in the array [1, 2, 3, 4]
              async.each([1, 2, 3, 4], square, function (err,result) {
                // Square has been called on each of the numbers
                // so we're now done!
                if(err==null){
                  console.log("Finished!");

                  for(var x in holder){
                    console.log(holder[x])
                  }
                  callback();
                }else{
                  console.log("Error...");
                  callback();
                }

              });
          });
}

// mutex.enqueue(init_query());
mutex.enqueue(function(callback) {setTimeout(() => {console.log('called 3'); callback()}, 500)});

//Testing JSON.stringify

// var array1 = [1,2,3,4,5,6,7];
// var array2 = [7,6,5,4,3,2,1];

// var obj = JSON.stringify({data1: array1, data2: array2});
// var get_arr1 = obj.data1;
// for(var x in get_arr1){
//   console.log(obj.data1[x]);
// }