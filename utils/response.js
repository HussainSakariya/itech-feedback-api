var Util = function () {};

Util.prototype.success = function (payload, message) {
    
    return {success: true, message: message, result: payload}

}
Util.prototype.error = function (payload, message) {
    //log.error("err: " + payload)
    return {success: false, message: message, result: []}

}
module.exports =new Util();
