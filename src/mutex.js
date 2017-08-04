var MUTEX_CHECK_INTERVAL = 50;
Mutex = function() {
    this.lock = false;
    this.queue = [];
    this.run = false;
    this.enqueue = function(functionToCall) {
        this.queue.push(functionToCall);
        if (!this.run) {
            this.run = setInterval(this.waitToCall.bind(this), MUTEX_CHECK_INTERVAL);
        }
    };
    this.waitToCall = function() {
        if (!this.lock) {
            this.lock = true;
            let nextFunction = this.queue.shift();
            let callback = function() {
                this.lock = false;
            }.bind(this);
            nextFunction(callback);
            if (this.queue.length === 0) {
                clearInterval(this.run);
                this.run = false;
            }
        }
    };
};