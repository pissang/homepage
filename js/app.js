(function() {

    var WP_ROOT = '../wordpress/';

    var app = angular.module('homepage', ['homepage.background'])

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl : 'partials/home.html'
            })
            .when('/portfolio', {
                templateUrl : 'partials/portfolio.html',
                controller : 'portfolio'
            })
            .when('/post/:id', {
                templateUrl : 'partials/post.html',
                controller : 'post'
            })
            .when('/posts', {
                templateUrl : 'partials/posts.html',
                controller : 'posts'
            })
            .when('/resume', {
                templateUrl : 'partials/resume.html'
            })
            .when('/about', {
                templateUrl : 'partials/about.html'
            })
    }]);

    app.controller("posts", function($scope, $http) {
        // Fetch posts
        $http({
            method : 'GET',
            url : WP_ROOT + '?json=get_posts&page=1&count=10'
        })
        .success(function(data) {
            // Column right in timeline
            $scope.posts = []

            _.each(data.posts, function(post) {
                var firstParagraph = post.content.match(/<p>(.*?)<\/p>/);
                if (firstParagraph) {
                    firstParagraph = firstParagraph[1];
                }
                $scope.posts.push({
                    title : post.title,
                    excerpt : firstParagraph,
                    date : post.date,
                    id : post.id
                });
            });
        });

        // Fetch categories
        $http({
            method : 'GET',
            url : WP_ROOT + '?json=get_category_index'
        })
        .success(function(data) {
            $scope.categories = [];

            _.each(data.categories, function(category) {
                $scope.categories.push({
                    id : category.id,
                    title : category.title,
                    postCount : category.post_count,
                })
            });
        });

        var MONTH = ['', 'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.']
        // Fetch dates
        $http({
            method : 'GET',
            url : WP_ROOT + '?json=get_date_index',
        })
        .success(function(data) {
            $scope.dates = [];
            _.each(data.tree, function(year, yearNumber) {
                var months = [];
                $scope.dates.push({
                    months : months,
                    year : yearNumber
                });

                _.each(year, function(count, month) {
                    months.push({
                        month : MONTH[parseInt(month)],
                        count : count
                    })
                })
            })
        });
    });

    app.controller('post', function($scope, $http, $routeParams) {
        var id = $routeParams.id;

        $http({
            method : 'GET',
            url : WP_ROOT + '?json=get_post&post_id=' + id
        })
        .success(function(data) {
            var post = data.post;
            $scope.post = {
                title : post.title,
                date : post.date,
                modified : post.modified,
                content : post.content
            }
        });
    });

    app.controller("portfolio", function($scope, $http) {
        // -----------------------------------------------------------
        // THESE DATA WILL BE FETCHED WITH AJAX FROM WORDPRESS!!!
        // Column left in timeline
        $scope.tlColumnLeft = [
            {
                title : 'Polyzoom',
                date : '2009-08-07',
                excerpt : 'This is the project for Introduction to Human-Computer Interaction course.'
            },
            {
                title : 'An Interactive Web White Board Based On Feature Assisted Sketching',
                date : '2009-08-07',
                excerpt : 'Inspired by the SIGGRAPH 2011 paper ShadowDraw: Real-Time User Guidance for Freehand Drawing, we presented an Interactive Web White Board, iPaper, based on Browser-Server Architecture, using Python.'
            },
            {
                title : '“THE ONE” Android App Design',
                date : '2009-08-07',
                excerpt : 'We started this project for our own interest. The idea just came out in our mind one day.'
            }
        ]
        // Column right in timeline
        $scope.tlColumnRight = [
            {
                title : 'Storyboard',
                date : '2009-08-07',
                excerpt : 'This is the project for Programming Interactive System course. We implemented a storyboarding tool using Javascript, HTML, CSS. I implemented two modes, linear mode and tree mode to represent the structure of storyboard.'
            }
        ]
        // -----------------------------------------------------------
    });
    
    app.animation("tlunit-fadein-enter", function() {
        return {
            setup : function(element) {
                // Random delay
                $(element).css('transition-delay', Math.random()/2 +'s');
            },
        }
    })
    
})();
