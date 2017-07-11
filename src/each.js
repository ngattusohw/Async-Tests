// Include the async package
// Make sure you add "async" to your package.json
var async = require("async");
var request = require("request")

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

function init_query(){
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

                console.log("Finished!");

                for(var x in holder){
                  console.log(holder[x])
                }

              });
          });
}

init_query();