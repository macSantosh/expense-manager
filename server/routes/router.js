var express = require('express');
var bodyParser = require('body-parser');
var Expense = require('../../models/Expense')

var router = express.Router();

router.get('/', function(req, res){
  res.render('index');
});


router.post('/insert', function(req, res){
  console.log('insert called');
  var expense = new Expense();
  expense.description = req.body.desc;
  expense.amount = req.body.amount;
  expense.month = req.body.month;
  expense.year = req.body.year;

  expense.save(function(err){
    if(err){
      res.send(err);
    }
    res.send('Expense successfully added');
  })
});

router.get('/delete', function(req,res){
  console.log('delete action called');
  var id = req.query.id;
  Expense.find({_id:id}).remove().exec(function(err, expense){
    if(err){
      res.send(err)
    }else{
      res.send('expennse id: '+ id +' successfully deleted ');
    }
  });

});

router.get('/getAll', function(req, res){
  //or i can change url pattern getAll :month :year
  var month = req.query.month;
  var year = req.query.year;
  console.log('month :' + month + ' year : '+ year + new Date());

  if(month && month != 'All'){
    Expense.find({$and: [{month: month}, {year: year}]},
                  function(err, expense){
                      if(err){
                        res.send(err);
                      }else{
                        res.json(expense);
                      }
                  });// end FIND
   } else{
    Expense.find({year: year}, function(err, expenses){
      if(err){
        res.send(err);
      }else{
        res.json(expenses);
      }
    });

  }//end Else

});// end getAll

router.get('/getAllExpenses', function(req, res){
  Expense.find(function(err, expense){
      if(!err){
        res.send(expense);
      }else{
        res.send(err);
      }
  });
});

router.get('*', function(req, res){
  res.render('index');
});


module.exports = router;
