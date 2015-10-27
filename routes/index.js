var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/one-hour-crud');
var cars = db.get('cars')

/* GET home page. */
router.get('/', function(req, res, next) {
  cars.find({}, function(err, record){
    res.render('index', { title: 'Cars: One-Hour-Crud', carsCollection: record });
  })
});

router.get('/new', function(req, res, next){
  res.render('new', {title: 'Cars: create new car'})
})

router.post('/new', function(req, res, next){
  cars.insert({name: req.body.carName}, function(err, record){
    res.redirect('/')
  })
})

router.get('/show/:_id', function(req, res, next){
  cars.findOne({_id: req.params._id}, function(err, record){
    res.render('show', {title: 'Cars', car: record})
  })
})

router.get('/edit/:_id', function(req, res, next){
  cars.findOne({_id: req.params._id}, function(err, record){
    res.render('edit', {title: 'Cars: edit ' + record.name, car: record})
  })
})

router.post('/edit/:_id', function(req, res, next){
  cars.update({_id: req.params._id}, {name: req.body.carName}, function(err, record){
    res.redirect('/')
  })
})

router.get('/delete/:_id', function(req, res, next){
  cars.remove({_id: req.params._id}, {_id: req.params._id},  function(err, record){
    res.redirect('/')
  })
})




module.exports = router;
