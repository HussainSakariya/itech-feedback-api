require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("./firebase.integration");

const feedback = db.collection('002_employee_feedbacks'); 
const referenceTable = db.collection('003_reference_table'); 


verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    
    if (!token) {
        return res.status(403).send({
        message: "No token provided!"
        });
    }
    
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
        return res.status(401).send({
            message: "Unauthorized!"
        });
        }
        req.userId = decoded.user_id;
        next();
    });
};

isUser = async (req, res, next) => {
    const login_data = await referenceTable.doc(req.userId).get();
    if (login_data){
        req.user_data = login_data.data();
        next()
    }else{
        return res.status(403).send({
            message:"Invalid User!"
        });
    }

};


const authJwt = {
    verifyToken: verifyToken,
    isUser:isUser
};

module.exports = authJwt;