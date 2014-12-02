ngBootbox
=========

AngularJS wrapper for Bootbox.js. Bootbox.js allowes you to easily make use of Twitter Bootstrap modals for javascript alerts, confirms and prompts. ngBootbox includes three directives, one for each of alert, confirm and prompt.

Prerequisites
=========

* <a href="http://angularjs.org">AngularJS</a>
* <a href="http://jquery.com">jQuery</a>
* <a href="http://getbootstrap.com">Bootstrap3</a>
* <a href="http://bootboxjs.com">Bootbox.js</a>

Demo
====

Visit this page for a working [demo](http://eriktufvesson.github.io/ngbootbox/ "ngBootbox").

Usage
=========

ng-bootbox-alert
----------------

    <button class="btn btn-default" ng-bootbox-alert="Alert message!">
        Alert
    </button>

ng-bootbox-confirm
------------------

    <button class="btn btn-lg btn-primary" ng-bootbox-confirm="Are you sure you want to confirm this?"
            ng-bootbox-confirm-action="confirmCallbackMethod(attr1, attr2)" ng-bootbox-confirm-action-cancel="confirmCallbackCancel(attr1, attr2)">
        Confirm
    </button>

ng-bootbox-prompt
-----------------

    <button class="btn btn-lg btn-primary" ng-bootbox-prompt="Please type in your name"
            ng-bootbox-prompt-action="promptCallback(result)" ng-bootbox-prompt-action-cancel="promptCallbackCancelled(result)">
        Prompt
    </button>

ng-bootbox-custom-dialog
------------------------

    <button class="btn btn-lg btn-primary"
            ng-bootbox-title="A cool title!"
            ng-bootbox-custom-dialog="Some custom text"
            ng-bootbox-buttons="customDialogButtons">
        Custom dialog
    </button>

and in your controller

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

Custom dialog with HTML Template
--------------------------------

    <button class="btn btn-lg btn-primary"
            ng-bootbox-title="A cool title!"
            ng-bootbox-custom-dialog
            ng-bootbox-custom-dialog-template="custom-dialog.tpl.html"
            ng-bootbox-buttons="customDialogButtons">
        Custom dialog with template
    </button>

