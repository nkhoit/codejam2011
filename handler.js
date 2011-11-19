var hQ = [];

var worker = false;
var worker_cur = 0;
var worker_max = 10;

function _check() {
    if (!worker && currentClients < maxClients) {
        hs.watcher.start();
        active = true;
    }
}

function _shiftQ() {
    return hQ.shift();  
}
    
    
    

function _execQ() {
    console.log("execQ");
    // if worker avaliable then run 
    if (worker_cur < worker_max) {
        var cb = _shiftQ();
        cb();
        worker_cur--;
    }
}

module.export = {
    addReq: function (cb) {
        worker_cur++;
        hQ.push(cb);
        _execQ();
    }
};