require("dotenv").config();
const db = require("../../firebase.integration");
const util = require("../../utils/response");
const jwt = require("jsonwebtoken");

const feedback = db.collection('002_employee_feedbacks'); 
const referenceTable = db.collection('003_reference_table'); 

class AdminFeedbackPipeLine {

    async getemployeefeedback(request, response) {
        try {
            const feedbacklist=[]
            let feedbackdata = await feedback.get();
            for (const feedback of feedbackdata.docs) {
                feedbacklist.push(feedback.data());
            }
            return response.status(200).send(util.success(feedbacklist,"SuccessFully Fetch"));
        } catch (err) {
            return response.status(400).send(util.error({},"Something went wrong."));
        }
    }

    async checkAdminAuth(request, response) {
        try {
            if (request.user_data && request.user_data!={}){
                console.log('request.user_data', request.user_data)
                return response.status(200).send(util.success(request.user_data,"SuccessFully Fetch"));
            }else{
                return response.status(400).send(util.error({},"Something went wrong."));
            }
        } catch (err) {
            return response.status(400).send(util.error({},"Something went wrong."));
        }
    }

    async adminlogin(request, response) {
        try {
            let data = request.body;
            if (data.username!="" && data.password!=""){
                const login_detail = await referenceTable.where("ADMIN_USERNAME", "==",data.username).where("ADMIN_PASSWORD", "==",data.password).get()
                if (login_detail.size!=0){
                    var user_id = "" 
                    var user_data ={} 
                    for (const login_user of login_detail.docs) {
                        user_id = login_user.id;
                        user_data.username=login_user.data().ADMIN_USERNAME;
                    }
                    var token = jwt.sign({ user_id: user_id },process.env.ACCESS_TOKEN_SECRET);
                    return response.status(200).send(util.success({id:user_id,username:user_data.username,accessToken:token},"SuccessFully logined"));
                }else{
                    return response.status(400).send(util.error({},"Something wentdfd wrong."));
                }
            }else{
                return response.status(400).send(util.error({},"Something went wrong."));
            }
        } catch (err) {
            return response.status(400).send(util.error({},"Something went wrong."));
        }
    }
}

module.exports = new AdminFeedbackPipeLine();
