const express = require("express");
var cors = require('cors');

const app = express()
app.use(express.json())
app.use(cors());


const employees = db.collection("001_employees");
const feedback = db.collection('002_employee_feedbacks'); 
const referenceTable = db.collection('003_reference_table'); 


app.post("/api/add_employee",async(req,res)=>{
    const data = req.body;
    // console.log(data);
    await employees.add(data);
    res.send({msg:"employee add successfully."});
});

app.post("/api/employee_feedback",async(req,res)=>{
    const data = req.body;
    // console.log(data);
    await feedback.add(data);
    res.send({msg:"employee feedback add successfully."});
});

app.get("/api/employee_list",async(req,res)=>{
    let emp_list=[];
    const emp_data = await feedback.get();
    // console.log(emp_data.docs);
    for (const emp of emp_data.docs) {
        emp_list.push(emp.data());
        // console.log(emp.data());
    }
    res.json(emp_list);
    // res.send(emp_list);
});

// ================== Admin Credential Check ================== //

app.post("/api/adminLogin",async(req,res)=>{
    const data = req.body;
    console.log(data);
    if (data.username!="" && data.password!=""){
        const admin_login = await referenceTable.where('ADMIN_USERNAME', '==', data.username).where('ADMIN_PASSWORD', '==', data.password).get();
        console.log(admin_login);
    }
    res.send({msg:"employee feedback add successfully."});
});

app.listen(4000,() => console.log("Starting Port :4000"));
