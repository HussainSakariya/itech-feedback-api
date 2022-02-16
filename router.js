const Auth = require("./authjwttoken");
var admin = require(appRoot + "/modules/admin");
var employee = require(appRoot + "/modules/employee");


// Routes
module.exports = function (app) {
    app.get("/getfeedback",[Auth.verifyToken,Auth.isUser],admin.getemployeefeedback);
    app.post("/adminlogin", admin.adminlogin);
    app.post("/addfeedback",employee.addemployeefeedback);
    app.get("/getemployee", employee.getemployee);
    app.get("/checkauth",[Auth.verifyToken,Auth.isUser],admin.checkAdminAuth)
};
