const express = require('express')

var router = express.Router()
// 要引入 user的数据库架构完成的状态
const admin = require('../sql/admin')

router.get('/',function(req,res,next){
    console.log('此时进入了注册的/里面了')

    res.render("register")
})


router.post('/in',function(req,res,next){
    // console.log(1);
    console.log('此时进入了注册的in里面了')
    console.log(req.body);
    let obj = req.body

    // console.log(obj)

    admin.findOne({username:obj.username},(err,data)=>{
        if(err){
            console.log('err')
        }
        console.log(data);
        if(data) {
            res.redirect('/login')
        }else {
            admin.insertMany(obj,(err,data)=>{
                if(err){
                    console.log(err)
                }
                console.log(data)
                res.redirect('/register')
            })
        }
    })

    
})

module.exports = router;