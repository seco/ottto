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
    'restangular'
  ])

  
  .config ($routeProvider, $locationProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainCtrl'
      .when '/modules',
        templateUrl: 'views/modules.html'
        controller: 'ModulesCtrl'
      .when '/rules',
        templateUrl: 'views/rules.html'
        controller: 'RulesCtrl'
      .when '/moduletypes',
        templateUrl: 'views/moduletypes.html'
        controller: 'ModuletypesCtrl'
      .otherwise
        redirectTo: '/'


  .config (RestangularProvider) ->
    RestangularProvider.setBaseUrl 'http://localhost:1337'