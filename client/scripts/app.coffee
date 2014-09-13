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
    'ActiveRecord'
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
        controller: 'RulesCtrl'
      .otherwise
        redirectTo: '/'
        