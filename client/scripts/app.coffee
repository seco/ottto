'use strict'

###*
 # @ngdoc overview
 # @name otttoApp
 # @description
 # # otttoApp
 #
 # Main module of the application.
###
angular
  .module('otttoApp', [
    'ngResource'
    'ngRoute'
    'ActiveRecord',
    'ui.knob',
    'frapontillo.bootstrap-switch'
  ])


  .config ($routeProvider, $locationProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainController'
      .when '/modules',
        templateUrl: 'views/modules.html'
        controller: 'ModulesController'
      .when '/moduletypes',
        templateUrl: 'views/moduletypes.html'
        controller: 'ModuleTypesController'
      .when '/modulegroups',
        templateUrl: 'views/modulegroups.html'
        controller: 'ModuleGroupsController'
      .when '/rules',
        templateUrl: 'views/rules.html'
        controller: 'RulesController'
      .otherwise
        redirectTo: '/'
