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

function _execQ() {
    // if worker avaliable then run 
        var cb = hQ.shift();
        cb()
        worker_cur--;
}

module.export = {
    addReq: function (cb) {
        hQ.push(cb);
        _execQ()
    }
};