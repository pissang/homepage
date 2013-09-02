(function() {

    var app = angular.module('homepage', ['homepage.background'])

    app.controller("timeline", function($scope, $http){
        // -----------------------------------------------------------
        // THESE DATA WILL BE FETCHED WITH AJAX FROM WORDPRESS!!!
        // Column left in timeline
        $scope.tlColumnLeft = [
            {
                title : 'Polyzoom',
                date : '2009-08-07',
                description : 'This is the project for Introduction to Human-Computer Interaction course.'
            },
            {
                title : 'An Interactive Web White Board Based On Feature Assisted Sketching',
                date : '2009-08-07',
                description : 'Inspired by the SIGGRAPH 2011 paper ShadowDraw: Real-Time User Guidance for Freehand Drawing, we presented an Interactive Web White Board, iPaper, based on Browser-Server Architecture, using Python.'
            },
            {
                title : '“THE ONE” Android App Design',
                date : '2009-08-07',
                description : 'We started this project for our own interest. The idea just came out in our mind one day.'
            }
        ]
        // Column right in timeline
        $scope.tlColumnRight = [
            {
                title : 'Storyboard',
                date : '2009-08-07',
                description : 'This is the project for Programming Interactive System course. We implemented a storyboarding tool using Javascript, HTML, CSS. I implemented two modes, linear mode and tree mode to represent the structure of storyboard.'
            }
        ]
        // -----------------------------------------------------------
    });


})();
