const router = require("express").Router();
const { Router } = require("express");
const UserModel = require("../models/userModel");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');
const fetch = require('node-fetch');
var cron = require('node-cron');



//insert
router.post('/insertUser', async (req, res)=>{
  console.log(req.body)
  let { email, name, photo,currenciesFollowing,currenciesAdded,subscriptionType} = req.body;
  
  if(email == '') {
    res.json({
      msg:"FALSE",
    })
 }
  else {

    let params = {
    email, name, photo,currenciesFollowing,currenciesAdded,subscriptionType
   }
 
    let insertData = await UserModel.insert(params).return();   
      res.json({
    status: 200,
    msg:"INSERTED",
    result: insertData
    })
    if(!insertData){
    console.log(err);
    }
    else {
    console.log(" document inserted");
  //   res.send("true")
    }
  }
})


//update
router.put('/followcurrency', async (req, res) => {    

let result = await UserModel.find().where({_key:req.body.info._key});
let x =result[0].CurrenciesFollowing;

x.push(req.body.curr.curr);
let updateData = await UserModel.update(
  {
    CurrenciesFollowing:x
  }
  ).where({ _key:req.body.info._key}).return();
  
})


//get
router.post('/getuser', async (req, res) => {
  let result = await UserModel.find().where({_key:req.body._key}).return(); 
  
  res.json({
    status: 200,
    result: result
  })
})

//delete
router.post('/deleteCurrency', async (req, res)=>{
  console.log(req.body)
  let result = await UserModel.find().where({_key:req.body.info._key });
  console.log(result);
  let array=result[0].CurrenciesFollowing;
  // array.splice(req.body.currencyDel)
  array = array.filter(e => e !== req.body.currencyDel);
  // console.log(array)
  let result2 = await UserModel.update({CurrenciesFollowing:array}).where({_key:req.body.info._key }).return();
 res.send(result2);
})


router.post('/login', async (req, res) => {
  
  let result = await UserModel.find().where({name:req.body.fullname});
  if(!result){
    console.log(err);
  }
  else {
    if(result.length == 0){
      res.send("false")
    }
    else {
      
    res.json({
    message:"true",
    status: 200,
    result: result
  })
    }} 
})
 
  //   console.log('running a task every 20 seconds');
  // })
router.post('/notification', async (req, res) => {
  let result = await UserModel.find().where({_key:req.body.user._key}).return();

  // // console.log(result[0].CurrenciesFollowing)
  // console.log(req.body.token.toString())


  // cron.schedule('*/20 * * * * *', () => {
  

 
  if (result[0].CurrenciesFollowing.length >0) {

        var key = 'AAAA1oyZ2M0:APA91bEWrUDBif_VDQK-qvxkc76nZmcilyzY6t--KvGVxvuZJHcwOzHdpGMNTDlIGh26FQxdbUE0X3kssk1JD7Axh7f8r92Gs9_cjRKhwvebmKn8fRbC5dG24BfruMYfkPkDkEcJTOj0';
        var to = '  fV4ne-vK8-z3qxAYP0sjm-:APA91bHIIrQbSnujeD7Z_XT_AksQ11PE2_6PWDBV0Ylvj-1ukyHvubcLqMYpwJp-64K9V0mtc-AmBP9wk-jp-nVy5wnuK5f4SHLm09U5ju1M_QwCdQJkfKUiSkFtirW5FhCwZIeO8XSK';
        
        var notification = {
          'title': 'Check Your Currencies',
          'body': result[0].CurrenciesFollowing,    
        };
        
        fetch('https://fcm.googleapis.com/fcm/send', {
          'method': 'POST',
          'headers': {
            'Authorization': 'key=' + key,
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({
            'notification': notification,
            'to': to
          })
        }).then(function(response) {
          console.log("notification sent");
        }).catch(function(error) {
          console.error(error);
        })


      }
      // })
      })

//upload Image
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'images');
      
  },
  filename: function(req, file, cb) {   
      cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

let upload = multer({ storage, fileFilter });

router.route('/upload').put(upload.single('file'),async (req, res) => {

  let data = JSON.parse(req.body.user)

  let updateData = await UserModel.update(
    {
      photo:req.file.filename
    }
    ).where({ _key:data._key}).return();
    res.json(req.file.filename);
});








module.exports = router ;
