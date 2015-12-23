'use strict'

angular
  .module('OtttoApp', [
    'ngResource'
    'ngRoute'
    'ActiveRecord'
  ])


  .config ($routeProvider, $locationProvider) ->
    $routeProvider
      .when '/',
        templateUrl: 'views/main.html'
        controller: 'MainController'

      # Modules
      .when '/modules',
        templateUrl: 'views/modules.html'
        controller: 'ModulesController'
      .when '/modules/:id',
        templateUrl: 'views/modules.html'
        controller: 'ModulesController'

      # Module Types
      .when '/moduletypes',
        templateUrl: 'views/moduletypes.html'
        controller: 'ModuleTypesController'
      .when '/modulegroups',
        templateUrl: 'views/modulegroups.html'
        controller: 'ModuleGroupsController'

      # Rules
      .when '/rules',
        templateUrl: 'views/rules.html'
        controller: 'RulesController'
      .when '/rules/:id',
        templateUrl: 'views/rules/rule.html'
        controller: 'RuleController'
      .when '/rules/new',
        templateUrl: 'views/rules/rule.html'
        controller: 'RuleController'

      .otherwise
        redirectTo: '/'

    # $locationProvider.html5Mode yes

  .run () ->
    # Attach a listener which fires when a connection is established:
    io.socket.on 'connect', ()->

      console.log 'Socket is now connected and globally accessible as `socket`.'

      # Attach a listener which fires every time the server publishes a message:
      io.socket.on 'message', (message) ->

        console.log 'New message received from Sails ::\n', message



