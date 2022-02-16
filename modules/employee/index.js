const db = require("../../firebase.integration");
const util = require("../../utils/response");

const feedback = db.collection('002_employee_feedbacks');
const employees = db.collection("001_employees");

class EmployeeFeedbackPipeLine {

    async addemployeefeedback(request, response) {
        try {
            let data = request.body;
            if (typeof data.to!="undefined" && typeof data.feedback!="undefined" && data.to!="" && data.feedback!=""){
                await feedback.add(data);
                return response.status(200).send(util.success(data,"SuccessFully Added"));
            }else{
                return response.status(400).send(util.error({},"Please Select Field."));
            }
        } catch (err) {
            return response.status(400).send(util.error({},"Something went wrong."));
        }
    }

    async getemployee(request, response) {
        try {
            const employeelist=[]
            let employeedata = await employees.get();
            for (const employee of employeedata.docs) {
                employeelist.push(employee.data());
            }
            return response.status(200).send(util.success(employeelist,"SuccessFully Added"));
        } catch (err) {
            return response.status(400).send(util.error({},"Something went wrong."));
        }
    }
}

module.exports = new EmployeeFeedbackPipeLine();
