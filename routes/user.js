var express = require('express');
var router = express.Router();
const user = require('../sql/user')
/* GET home page. */
router.get('/', function(req, res, next) {
  user.find({},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)

    res.render('user', {
      index:2,
      data:data
    });
  })
  
});




router.get("/add", function (req, res, next) {
  res.render("userAdd", {
    index: 1,
  });
});



router.post("/addAction", function (req, res, next) {

  console.log('进入/addAction里面了')
  let obj = req.body;
  //调用方法转数字
  obj.price = Number(obj.price);
  //隐形转换
  obj.discount = obj.discount - 0;
   //隐形转换
  obj.score = obj.score * 1;
  console.log(obj);
  user.insertMany(obj,(err,data)=>{
       if(err) {
         console.log(err)
       } 
       console.log(data)
       res.redirect("/user");
  })
   
});

//删除操作
router.get("/delete", function (req, res, next) {
  //get来的数据在req.query.id
  // const id = req.query.id;
  console.log('我现在进入/delete里面了')
  console.log(req.query)

  user.deleteOne({'_id':req.query._id},(err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
     res.redirect("/user");
  })
  
});









//修改操作
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id    拿到宇宙唯一id
  console.log(req.query)

  const _id = req.query._id;
  console.log("_id", _id);

  user.findById({"_id":_id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    res.render('userUpdate',{
      index:1,
      data:data
    })
  })

});

// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log(1);
  // 接收当前商品的数据
  const obj = req.body;
  console.log('obj',obj)

  user.findByIdAndUpdate( obj._id,obj,(err,data)=>{
      if(err) {
        console.log(err)
      }
      // console.log(data)
      res.redirect("/user");
  })
});




//sort 排序
router.get("/sort1", (req, res, next) => {
  const obj = req.query;
    user.find({}).sort({username:1}).exec((err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
       res.render("user", {
      index: 2,
      data,
    })
   })
  
});

router.get("/sort2", (req, res, next) => {
  const obj = req.query;
    user.find({}).sort({username:-1}).exec((err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
       res.render("user", {
      index: 2,
      data,
    })
   })
});



//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  // console.log(obj);
  let  obj = req.query.search;
 
  user.find({username:obj},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
       res.render("user", {
       index: 3,
       data,
    });
  })
});







module.exports = router;
