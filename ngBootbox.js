angular.module('ngBootbox', [])
  /* @ngInject */
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
  /* @ngInject */
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
  /* @ngInject */
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
  /* @ngInject */
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
        buttons: '=ngBootboxButtons',
        className: '@ngBootboxClassName',
        data: '=ngBootboxData',
        options: '=ngBootboxOptions'
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
          if (scope.options) {
            bootbox.dialog(scope.options);
          }
          else {
            bootbox.dialog({
              message: msg,
              title: scope.title,
              buttons: scope.buttons,
              className: scope.className
            });
          }
        });
      }
    };
  })
  /* @ngInject */
  .factory('$ngBootbox', function($q, $templateCache, $compile, $rootScope, $http) {
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
      },
      customDialog: function(options) {
        if (options.templateUrl) {
          getTemplate(options.templateUrl)
            .then(function(template) {
              options.message = $compile(template)($rootScope);
              bootbox.dialog(options);
            })
            .catch(function() {
              bootbox.dialog(options);
            });
        }
        else {
          bootbox.dialog(options);
        }
      },
      setDefaults: function(options) {
        bootbox.setDefaults(options);
      },
      hideAll: function() {
        bootbox.hideAll();
      },
      setLocale: function(name) {
        bootbox.setLocale(name);
      },
      addLocale: function(name, values) {
        bootbox.addLocale(name, values);
      },
      removeLocale: function(name) {
        bootbox.removeLocale(name);
      }
    };

    function getTemplate(templateId) {
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
    }
  });
