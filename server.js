const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));


const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/restaurant");

var reviewSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name is required'], minlength: [3, 'Name must be 3 characters or greater']},
    stars: {type: Number, required: [true, 'Stars are required']},
    review: {type: String, required: [true, 'Review is required'], minlength: [3, 'Review should be 3 characters or greater.']},
    rest_id: {type: String, required: true}
}, {timestamps: true});

var Review = mongoose.model('Review', reviewSchema);

var restaurantSchema = new mongoose.Schema({
    name: {type: String, required: [true, 'Name is required'], minlength: [3, 'Name must be 3 characters or greater']},
    cuisine: {type: String, required: [true, 'Cuisine is required'], minlength: [3, 'Cuising type should be 3 characters or greater.']},
    reviews: [reviewSchema]
}, {timestamps: true});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

app.get('/get_restaurant', function(req,res) {
    Restaurant.find({}, function(err, restaurants) {
        if (err) {
            res.json(err);
        } else {
            res.json({data: restaurants});
        }
    })
})

app.post('/create', function(req,res) {
    Restaurant.findOne({name: req.body.name}, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            if (data == null) {
                Restaurant.create(req.body, function(err) {
                    if (err){
                        res.json(err)
                    } else {
                        res.json({status: 200})
                    }
                });
            } else {
                res.json({errors: {already_exist: 'Restaurant already exists'}});
            }
        }
    })
})

app.post('/create_review/:id', function(req,res) {
    Review.create({rest_id: req.params.id, name: req.body.name, stars: req.body.stars, review: req.body.review}, function(err, review) {
        if (err) {
            res.json(err);
        } else {
            Restaurant.findOneAndUpdate({_id: req.params.id}, {$push: {reviews: review}}, {runValidators: true}, function(err, data) {
                if (err) {
                    res.json(err);
                } else {
                    res.json({message: "it worked", status: 200});
                }
            });
        }
    });
});

app.get('/get_reviews/:id', function(req,res) {
    Review.find({rest_id: req.params.id}).sort([['stars', -1]]).exec(function(err,data) {
        if (err) {
            res.json(err);
        } else {
            res.json({message: data, status: 200});
        }
    })

});

app.get('/get_one/:id', function(req,res) {
    Restaurant.findOne({_id: req.params.id}, function(err, data) {
        if (err) {
            res.json(err);
        } else {
            res.json({message: data});
        }
    })
});

app.put('/update_rest/:id', function(req,res) {
    Restaurant.findOneAndUpdate({_id:req.params.id},{$set:req.body},{runValidators: true}, function(err,data) {
        if(err){
            res.json(err)
        }else{
            res.json({message:"it worked", status:200})
        }
    })
});

app.delete('/delete_rest/:id', function(req,res) {
    Restaurant.remove({_id: req.params.id}, function(err) {
        if (err) {
            return res.json(err);
        } else {
            Review.remove({rest_id: req.params.id}, function(err) {
                if (err) {
                    return res.json(err);
                } else {
                    return res.json({message: "it worked", status: 200});
                }
            })
        }
    });
    
});

app.delete('/delete_all', function(req,res) {
    Restaurant.remove({}, function(err) {
        if (err) {
            return res.json(err);
        } else {
            Review.remove({}, function(err) {
                if (err) {
                    return res.json(err);
                } else {
                    return res.json({message: "it worked", status: 200});
                }
            })
        }
    });
});


app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./public/dist/public/index.html'));
});

app.listen(8000, function() {
    console.log("listening to port 8000");
});