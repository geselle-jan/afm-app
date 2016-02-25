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

angular.module('app').controller('AppController', function ($scope) {

    $scope.playing = false;

    try {
        $scope.stream = new Audio('http://mp3.ffh.de/radioffh/livestream.aac');
        $scope.stream.id = 'afm';
    } catch (e) {
        ons.notification.alert({ message: 'no audio support!' });
    }

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
});