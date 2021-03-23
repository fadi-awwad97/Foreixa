const router = require("express").Router();
const currencyModel = require("../models/currencyModel");
var cron = require('node-cron');
var request = require('request');




//   cron.schedule('*/80 * * * * *', () => {
//     console.log('running a task every 80 seconds');
 
//     request.get('http://data.fixer.io/api/latest?access_key=f9877da0df5dc0b59ae2f8143f254485&format=1',async function(error, response, body) {
        
//         if (!error && response.statusCode == 200) {
//             // console.log(body) // Show the HTML for the Google homepage.           
//         }
//         var params ={currency:body}
//        let insertData = await currencyModel.insert(params).return();   
//         if(!insertData){
//             console.log(err);
//             }
//             else {
//             console.log(" document inserted");
//             }
          
   
//     })
// });


router.get('/getcurrencies', async (req, res) => {
    let result = await currencyModel.find().where({_key:"87367"});
    res.json({
      status: 200,
      result: result
    })
  })

  router.get('/getUserCurrencies', async (req, res) => {
    let result = await currencyModel.find().where({_key:"87367"});
    // res.json({
    //   status: 200,
    //   result: result
    // })
    res.send(result[0].currency.rates)
  })



module.exports = router ;

