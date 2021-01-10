const db = require("./db");

const adminSchema = new db.mongoose.Schema({
    "adminId":{type:String},
    "username":{type:String},
    "password":{type:String},
    "age":{type:Number},
    "sex":{type:String},
    "pay":{type:String},
    

   
})

module.exports = db.mongoose.model("order", adminSchema);