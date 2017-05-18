var restify = require('restify');
var client = restify.createJsonClient({
    url: 'https://api.foursquare.com',
    version: '*'
});

var restaurants = {
    getRestaurantsList: function (location, callback) {
        var foodQuery = '/v2/venues/explore?client_secret=WH0EDRQZEZCEBMKXG0WDA4GABITGQ2UC0TPXO0UFO4ELMKU0&client_id=2KFU352OMKJK2GEWP4EAE10KJCZAYFYEZ4H1ZXPYHD4V4FE5&v=20161101&limit=50&near=' + location + '&section=food'
        var allItems = [];

        client.get(foodQuery, function (err, req1, res1, obj) {
            if (err) {
                callback(err)
            } else {
                var temp = JSON.parse(res1.body);
                var arrRest = temp.response.groups[0].items;

                for (var i = 0; i < arrRest.length; i++) {
                    allItems.push(arrRest[i].venue.name);
                }
                console.log(allItems.join('\n'));
                callback(null, allItems);
            }
        });

    },


    getRestaurantReviews: function (restaurant, location, callback) {

        var collection = mongoDb.collection('restreviews');
        // Find some documents
        collection.find({ res_loc: restaurant + '_' + location }).toArray(function (err, docs) {
            if (err) {
                callback(err);
            } else {
                console.log("Found the following records");
                console.log(docs)
                callback(null, docs);
            }
        });
    },

    setRestaurantReview: function (restaurant, location, review, callback) {
        console.log("Setting review for " + restaurant);
        var idocument = { res_loc: restaurant + "_" + location, review: review, restaurant: restaurant, location: location }
        // Get the documents collection
        var collection = mongoDb.collection('restreviews');
        collection.insert(idocument, function (err, doc) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                console.dir('Document added : ', doc);
                callback(null, doc);
            }
        });
    }

};


module.exports = restaurants;