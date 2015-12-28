angular
  .module('OtttoApp', [
    'ui.router'
    'ngResource'
    'ngSails'
    'ActiveRecord'
  ])


  .config ($stateProvider, $urlRouterProvider) ->
    $stateProvider
      .state 'default',
        url: '/'
        templateUrl: 'views/main.html'
        controller: 'MainController'

      # Modules
      .state 'modules',
        url: '/modules'
        templateUrl: 'views/modules.html'
        controller: 'ModulesController'
      .state 'module',
        url: '/modules/:id'
        templateUrl: 'views/modules.html'
        controller: 'ModulesController'

      # Module Types
      .state 'types',
        url: '/moduletypes'
        templateUrl: 'views/moduletypes.html'
        controller: 'ModuleTypesController'
      .state 'groups',
        url: '/modulegroups'
        templateUrl: 'views/modulegroups.html'
        controller: 'ModuleGroupsController'

      # Rules
      .state 'rules',
        url: '/rules'
        templateUrl: 'views/rules.html'
        controller: 'RulesController'
      .state 'rule',
        url: '/rules/:id'
        templateUrl: 'views/rules/rule.html'
        controller: 'RuleController'
      .state 'newrule',
        url: '/rules/new'
        templateUrl: 'views/rules/rule.html'
        controller: 'RuleController'

      $urlRouterProvider.otherwise '/'
