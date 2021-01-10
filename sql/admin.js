const db = require("./db");

const adminSchema = new db.mongoose.Schema({
    "adminId":{type:String},
    "username":{type:String},
    "password":{type:String},
   
})

module.exports = db.mongoose.model("admin", adminSchema);
