var warpapp = angular.module('warpapp', ['ngRoute']);


warpapp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'templates/home.html',
            controller: 'MainController'
        })
        .when('/findRestaurants', {
            templateUrl: 'templates/restaurants.html',
            controller: 'MainController'
        })
        .when('/writeReview', {
            templateUrl: 'templates/restaurants.html',
            controller: 'MainController'
        });
});

warpapp.controller('MainController', ['$scope', '$http', function MainController($scope, $http) {
    $scope.rowCollection = [];
    $scope.reviewCollection = [];
    $scope.showReviewBox = false;
    var currentRestaurant = '';

    $scope.searchRestaurants = function () {
        $scope.rowCollection = [];
        var currentLocation = ($scope.location).replace(/ /g, "@");
        $http.get('http://localhost:8080/getAllRestaurants/' + currentLocation)
            .success(function (data, status, headers, config) {
                var restList = data.message.split('_');
                for (var i = 0; i < restList.length; i++) {
                    $scope.rowCollection.push({ restName: restList[i] });
                }
            })
            .error(function (data, status, header, config) {
                alert("Something went wrong");
                console.log('error', data);
            });
    };

    $scope.showReviews = function (row) {
        $scope.reviewCollection = [];
        $scope.showReviewBox = true;
        currentRestaurant = row.restName;
        var currentLocation = ($scope.location).replace(/ /g, "@");

        $http.get('http://localhost:8080/getRestaurantReviews/' + row.restName + '/' + currentLocation)
            .success(function (data, status, headers, config) {
                var reviewList = JSON.parse(data.message);

                for (var i = 0; i < reviewList.length; i++) {
                    $scope.reviewCollection.push(reviewList[i].review);
                }
            })
            .error(function (data, status, header, config) {
                alert("Something went wrong");
                console.log('error', data);
            });
    };


    $scope.submitReview = function () {
        var reviewText = document.getElementById('reviewText').value;
        var currentLocation = ($scope.location).replace(/ /g, "@");
        var inputdata = {
            review: reviewText,
            restaurant: currentRestaurant,
            location: currentLocation
        };

        var config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
            }
        }

        $http.post('http://localhost:8080/setRestaurantReview/', inputdata)
            .success(function (data, status, headers) {
                $scope.PostDataResponse = data;
                console.log(data);
                $scope.reviewCollection.push(reviewText);
            })
            .error(function (data, status, header) {
                console.log("Error", data);
            });
    };
}]);