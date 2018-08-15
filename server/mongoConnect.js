var mongoose = require('mongoose');

var dbconnect = mongoose.connect(
  'mongodb://user:santosh123@ds031541.mlab.com:31541/expense_manager_db',
  { useNewUrlParser: true },
   function(err){
     if(err){
       console.error('could not connect to database '+ JSON.stringify(err, undefined, 2));
     }else{
       console.log('mongoDB successfully connected');
     }
   });

module.exports = dbconnect;
