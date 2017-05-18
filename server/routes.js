// ROUTES FOR OUR API
var express = require('express');
var router = express.Router();
var restaurants = require('./restaurant.js');
var swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Restaurant Guide Swagger API',
        version: '1.0.0',
        description: 'Documentation for WARP assignment',
    },
    host: 'localhost:8080',
    basePath: '/',
};

// options for the swagger docs
var swaggerOptions = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    apis: ['./routes.js'],
};

var swaggerSpec = swaggerJSDoc(swaggerOptions);




/**
 * @swagger
 * /getAllRestaurants/{location}:
 *   get:
 *      tags:
 *       - restaurants
 *      description: Gets a list of restaurants at a place
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: location
 *         description: Location of Restaurant
 *         in: path
 *         required: true
 *         type: string
 *      responses:
 *       200:
 *         description: Restaurants list returned
 */
router.get('/getAllRestaurants/:location', function (req, res) {
    restaurants.getRestaurantsList(req.params.location, function(err, data){
        if(err){
            res.json({ status: 'error', message: err });
        }else{
            res.json({ status: 'success', message: data.join('_') });
        }
    })
});

/**
 * @swagger
 * /getRestaurantReviews/{restaurant}/{location}:
 *   get:
 *      tags:
 *       - reviews
 *      description: Gets all reviews for a restaurant
 *      produces:
 *        - application/json
 *      parameters:
 *       - name: restaurant
 *         description: Restaurant name
 *         in: path
 *         required: true
 *         type: string
 *       - name: location
 *         description: location of restaurant
 *         in: path
 *         required: true
 *         type: string
 *      responses:
 *       200:
 *         description: List of all reviews for a restaurant is returned
 */
router.get('/getRestaurantReviews/:restaurant/:location', function (req, res) {

    restaurants.getRestaurantReviews(req.params.restaurant, req.params.location, function(err, data){
        if(err){
            res.json({ status: 'error', message: err });
        }else{
            res.json({ status: 'success', message: JSON.stringify(data) });
        }
    })
});



/**
 * @swagger
 * definition:
 *   RestaurantObject:
 *     properties:
 *       restaurant:
 *         type: integer
 *       location:
 *         type: string
 *       review:
 *         type: string
 */
/**
 * @swagger
 * /setRestaurantReview:
 *   post:
 *     tags:
 *       - Reviews
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Review
 *         description: Restaurant object
 *         in: body
 *         required: true,
 *         schema: 
 *              $ref: '#/definitions/RestaurantObject'
 *     responses:
 *       200:
 *         description: Restaurant review data returned
 */
router.post('/setRestaurantReview', function(req, res, next){
    console.log(req.body);
    console.log("Received request to add new review for "+ req.body.restaurant);
    
    var restaurant = req.body.restaurant;
    var location = req.body.location;
    var review = req.body.review;

    restaurants.setRestaurantReview(restaurant, location, review, function(err, data){
        if(err){
            res.json({ status: 'error', message: err });
        }else{
            res.json({ status: 'success', message: data });
        }
    })
   
});


// serve swagger
router.get('/swagger.json', function(req, res, next) {
    console.log("Swagger request", swaggerSpec)
     res.status(200).send(swaggerSpec)
});



module.exports = router;