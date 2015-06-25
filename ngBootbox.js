angular.module('ngBootbox', [])
  /* @ngInject */
  .directive('ngBootboxAlert', function($ngBootbox) {
    return {
      restrict: 'A',
      scope: false,
      link: function (scope, element, attr) {
        var msg = attr.ngBootboxAlert || "Yo!";
        element.bind('click', function () {
          $ngBootbox.alert(msg);
        });
      }
    };
  })
  /* @ngInject */
  .directive('ngBootboxConfirm', function($ngBootbox) {
    return {
      restrict: 'A',
      scope: {
        actionOK: '&ngBootboxConfirmAction',
        actionCancel: '&ngBootboxConfirmActionCancel'
      },
      link: function (scope, element, attr) {
        var msg = attr.ngBootboxConfirm || "Are you sure?";
        element.bind('click', function () {
          $ngBootbox.confirm(msg).then(function () {
            // scope.$apply(scope.actionOK);
            scope.actionOK();
          }, function () {
            //scope.$apply(scope.actionCancel);
            scope.actionCancel();
          });
        });
      }
    };
  })
  /* @ngInject */
  .directive('ngBootboxPrompt', function($ngBootbox) {
    return {
      restrict: 'A',
      scope: {
        actionOK: '&ngBootboxPromptAction',
        actionCancel: '&ngBootboxPromptActionCancel'
      },
      link: function (scope, element, attr) {
        var msg = attr.ngBootboxPrompt || "Are you sure?";
        element.bind('click', function () {
          $ngBootbox.prompt(msg).then(function (result) {
            scope.actionOK({result: result});
          }, function() {
            scope.actionCancel();
          });
        });
      }
    };
  })
  /* @ngInject */
  .directive('ngBootboxCustomDialog', function($ngBootbox) {

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
        var options = {},
            templateUrl = attr.ngBootboxCustomDialogTemplate;

        if (scope.options) {
          options = scope.options;
        }
        if(scope.title) options.title = scope.title;
        if(scope.buttons) options.buttons = scope.buttons;
        if(scope.className) options.className = scope.className;
        if(scope.data) options.data = scope.data;
        if( templateUrl ) {
          options.templateUrl = templateUrl;
        } else {
          options.message = attr.ngBootboxCustomDialog;
        }

        element.bind('click', function () {
          $ngBootbox.customDialog(options);
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
              options.scope = options.scope || $rootScope;
              options.message = $compile(template)(options.scope);
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
