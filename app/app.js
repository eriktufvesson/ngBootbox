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
          //$scope.$apply();
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

      $scope.customDialogButtons = {
          warning: {
              label: "Warning!",
              className: "btn-warning",
              callback: function() { $scope.addAction('Warning', false); }
          },
          success: {
              label: "Success!",
              className: "btn-success",
              callback: function() { $scope.addAction('Success!', true) }
          },
          danger: {
              label: "Danger!",
              className: "btn-danger",
              callback: function() { $scope.addAction('Danger!', false) }
          },
          main: {
              label: "Click ME!",
              className: "btn-primary",
              callback: function() { $scope.addAction('Main...!', true) }
          }
      };

      $scope.customConfirmButtons = {
          ok: {
              label: "Ok",
              className: "btn-primary",
              callback: function() { $scope.deleteBook(); }
          },
          cancel: {
              label: "Cancel",
              className: "btn-default"
          }
      };

      $scope.deleteBook = function() {
          $ngBootbox.alert('Book deleted!');
      };
  })
  .controller('CustomCtrl', function($scope, $log, $ngBootbox) {
      $scope.items = [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' },
          { id: 3, name: 'Item 3' }
      ];

      $scope.buttonClick = function() {
          $ngBootbox.alert('The button was clicked!');
      };
  });
