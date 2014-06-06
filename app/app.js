/**
 * Created by Erik on 2014-05-30.
 */
angular.module('testApp', ['ngBootbox'])
    .controller('TestCtrl', function($scope, $log, $ngBootbox) {

        $scope.actions = [];

        $scope.addAction = function(type, msg) {
            console.log(type + ': ' + msg);
            $scope.actions.push({
                msg: type + ': ' + msg
            });
            $scope.$apply();
        };


        $scope.handleAlert = function() {
            $ngBootbox.alert('test1!')
                .then(function() {
                    $log.log('Alert closed');
                });
        };

        $scope.handleConfirm = function() {
            $ngBootbox.confirm('test2!')
                .then(function() {
                    $log.info('Confirmed!');
                }, function() {
                    $log.log('Confirm dismissed!');
                });
        };

        $scope.handlePrompt = function() {
            $ngBootbox.prompt('test3!')
                .then(function(result) {
                    $log.info('Prompt returned: ' + result);
                }, function() {
                    $log.log('Prompt dismissed!');
                });
        };
    });
