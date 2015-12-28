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
        templateUrl: 'views/modules/index.html'
        controller: 'ModulesController'
        resolve:
          modules: [
            'Modules'
            (Modules) -> Modules.$get()
          ]
          types: [
            'ModuleTypes'
            (ModuleTypes) -> ModuleTypes.fetchAll()
          ]
          groups: [
            'ModuleGroups'
            (ModuleGroups) -> ModuleGroups.fetchAll()
          ]
      .state 'modules.detail',
        url: '^/:id'
        views:
          detail:
            templateUrl: 'views/modules/detail.html'
            controller: 'ModuleController'
      .state 'modules.new',
        url: '^/new'
        views:
          detail:
            templateUrl: 'views/modules/detail.html'
            controller: 'ModuleController'

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
