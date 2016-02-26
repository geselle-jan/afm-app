// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints,
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener( 'resume', onResume.bind( this ), false );
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
} )();

angular.module('app', ['onsen']);

angular.module('app').controller('AppController', function ($scope, $http) {

    $scope.playing = false;

    $scope.fbFeed = [];

    $scope.currentlyPlaying = '';

    try {
        $scope.stream = new Audio('http://mp3.ffh.de/radioffh/livestream.aac');
        $scope.stream.id = 'afm';
    } catch (e) {
        ons.notification.alert({ message: 'no audio support!' });
    }

    // metadata start


    $http.get('http://np.radioplayer.de/qp/v3/onair?rpIds=1').then(function(resp) {
        console.log('Metadata Success', resp.data);
        var matches = resp.data.match(/callback\((.+)\)/);
        var data = JSON.parse(matches[1]);
        console.log(data);
        var currentlyPlaying = '';
        if (data.results[1] && data.results[1][0].artistName) {
            currentlyPlaying += data.results[1][0].artistName;

            if (data.results[1] && data.results[1][0].name) {
                currentlyPlaying += ' - ' + data.results[1][0].name;
            }
        } else if (data.results[1] && data.results[1][1].artistName) {
            currentlyPlaying += data.results[1][1].artistName;

            if (data.results[1] && data.results[1][1].name) {
                currentlyPlaying += ' - ' + data.results[1][1].name;
            }
        } else {
            currentlyPlaying = 'HIT RADIO FFH'
        }
        $scope.currentlyPlaying = currentlyPlaying;
    }, function(err) {
        console.error('Metadata Error', err);
    });


    // metadata end


    $scope.doSomething = function () {
        ons.notification.alert({ message: 'tapped' });
    };

    $scope.play = function () {

        if (!$scope.playing) {
            $scope.stream.play();
            console.log('audio play');
            if (cordova && cordova.plugins && cordova.plugins.backgroundMode) {
                cordova.plugins.backgroundMode.enable();
            }
            $scope.playing = true;
        } else {
            $scope.stream.pause();
            console.log('audio pause');
            if (cordova && cordova.plugins && cordova.plugins.backgroundMode) {
                cordova.plugins.backgroundMode.disable();
            }
            $scope.playing = false;
        }

    };

    $http.get('https://graph.facebook.com/416174165248113/posts?access_token=443609082513315|f9879cb19ccc7c16fdc419a62829db05').then(function(resp) {
        console.log('FB Success', resp.data);
        $scope.fbFeed = resp.data.data;
    }, function(err) {
        console.error('FB Error', err);
    });
});