/**
 * Created by Erik on 2014-05-30.
 */
angular.module('testApp', ['ngBootbox'])
    .controller('TestCtrl', function($scope) {

        $scope.actions = [];

        $scope.addAction = function(type, msg) {
            console.log(type + ': ' + msg);
            $scope.actions.push({
                msg: type + ': ' + msg
            });
            $scope.$apply();
        };
    });
