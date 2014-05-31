/**
 * Created by Erik on 2014-05-30.
 */
angular.module('ngBootbox', function() {

})
    .directive('ngBootboxAlert', function() {
        return {
            restrict: 'A',
            scope: false,
            link: function (scope, element, attr) {
                var msg = attr.ngBootboxAlert || "Yo!";
                element.bind('click', function () {
                    bootbox.alert(msg);
                });
            }
        };
    })
    .directive('ngBootboxConfirm', function() {
        return {
            restrict: 'A',
            scope: {
                actionOK: '&ngBootboxConfirmAction',
                actionCancel: '&ngBootboxConfirmActionCancel'
            },
            link: function (scope, element, attr) {
                var msg = attr.ngBootboxConfirm || "Are you sure?";
                element.bind('click', function () {
                    bootbox.confirm(msg, function (result) {
                        if (result) {
                            scope.actionOK();
                        }
                        else {
                            scope.actionCancel();
                        }
                    });
                });
            }
        };
    })
    .directive('ngBootboxPrompt', function() {
        return {
            restrict: 'A',
            scope: {
                actionOK: '&ngBootboxPromptAction',
                actionCancel: '&ngBootboxPromptActionCancel'
            },
            link: function (scope, element, attr) {
                var msg = attr.ngBootboxPrompt || "Are you sure?";
                element.bind('click', function () {
                    bootbox.prompt(msg, function (result) {
                        if (result !== null) {
                            scope.actionOK({result: result});
                        }
                        else {
                            scope.actionCancel();
                        }
                    });
                });
            }
        };
    });