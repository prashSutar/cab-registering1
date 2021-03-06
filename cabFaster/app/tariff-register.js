var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser'); //parses information from POST


    //Any requests to this controller must pass through this 'use' function
    //Copy and pasted from method-override
    //router.use(bodyParser.urlencoded({ extended: true }))


    var mongoose = require('mongoose');

    var tariffSchema = mongoose.Schema({
      tarfCabType: String,
      tarfRate: String
  });

var Tariff = mongoose.model('Tariff', tariffSchema, 'tariff');

//Movie
router.get('/getTarf', function(req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Tariff.find({}, function(err, docs) {
        res.json(docs);

    });
});

router.get('/getTarf/:id', function(req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
    Tariff.find({ _id: req.params.id }, function(err, docs) {
        res.json(docs);

    });
});

router.post('/addTarf', function(req, res) {
    console.log(req.body);


    var cabtype = req.body.tarfCabType;
    var rate = req.body.tarfRate;

    var tariff = new Tariff({

        tarfCabType: cabtype,
        tarfRate: rate
    });

    tariff.save(function(err, docs) {
        if (err) throw err;
        console.log("Book Saved Successfully");
        res.json(docs);
    });

})

router.delete('/deleteTarf/:id', function(req, res) {
    console.log("REACHED Delete FUNCTION ON SERVER");
    Tariff.remove({ _id: req.params.id }, function(err, docs) {
        res.json(docs);
    });
})

router.put('/updateTarf/:id', function(req, res) {
    console.log("REACHED PUT");
    console.log(req.body);
    Tariff.findOneAndUpdate({ _id: req.params.id }, req.body, function(err, data) {
        console.log(data);
        res.json(data);
    });
})


// catch 404 and forward to error handler
router.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = router;
