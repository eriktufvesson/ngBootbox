angular.module('ngBootbox', function() {

})
  .directive('ngBootboxAlert', function($ngBootbox) {
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
                          scope.$apply(scope.actionOK);
                      }
                      else {
                          scope.$apply(scope.actionCancel);
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
                          scope.$apply(function() { scope.actionOK({result: result}); });
                      }
                      else {
                          scope.$apply(scope.actionCancel);
                      }
                  });
              });
          }
      };
  })
  .directive('ngBootboxCustomDialog', function($templateCache, $compile, $q, $http) {

      var getTemplate = function(templateId) {
          var def = $q.defer();

          var template = $templateCache.get(templateId);
          if (typeof template === "undefined") {
              $http.get(templateId)
                .success(function(data) {
                    $templateCache.put(templateId, data);
                    def.resolve(data);
                });
          } else {
              def.resolve(template);
          }
          return def.promise;
      };

      return {
          restrict: 'A',
          scope: {
              title: '@ngBootboxTitle',
              buttons: '=ngBootboxButtons'
          },
          link: function (scope, element, attr) {
              var msg = '';
              var templateUrl = attr.ngBootboxCustomDialogTemplate;
              if (templateUrl) {
                  getTemplate(templateUrl).then(function(res) {
                      msg = $compile(res)(scope);
                  });
              }
              else {
                  msg = attr.ngBootboxCustomDialog;
              }
              element.bind('click', function () {
                  bootbox.dialog({
                      message: msg,
                      title: scope.title,
                      buttons: scope.buttons
                  });
                  //scope.$apply();
              });
          }
      };
  })
  .factory('$ngBootbox', function($q) {
      return {
          alert: function(msg) {
              var deferred = $q.defer();
              bootbox.alert(msg, function() {
                  deferred.resolve();
              });
              return deferred.promise;
          },
          confirm: function(msg) {
              var deferred = $q.defer();
              bootbox.confirm(msg, function(result) {
                  if (result) {
                      deferred.resolve();
                  }
                  else {
                      deferred.reject();
                  }
              });
              return deferred.promise;
          },
          prompt: function(msg) {
              var deferred = $q.defer();
              bootbox.prompt(msg, function(result) {
                  if (result !== null) {
                      deferred.resolve(result);
                  }
                  else {
                      deferred.reject();
                  }
              });
              return deferred.promise;
          }
      };
  });
