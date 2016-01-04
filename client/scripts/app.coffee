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
            (ModuleTypes) -> ModuleTypes.$get()
          ]
          groups: [
            'ModuleGroups'
            (ModuleGroups) -> ModuleGroups.fetchAll()
          ]
      .state 'modules.detail',
        url: '^/modules/:id'
        views:
          detail:
            templateUrl: 'views/modules/detail.html'
            controller: 'ModuleController'
            resolve:
              module: [
                'modules', '$stateParams'
                (modules, $stateParams) ->
                  _.filter(modules, (module) ->
                    module.$attributes.id is Number $stateParams.id
                  )[0]
              ]
      .state 'modules.new',
        url: '^/modules/new'
        views:
          detail:
            templateUrl: 'views/modules/detail.html'
            controller: 'ModuleController'
            resolve:
              module: [
                'Module'
                (Module) -> new Module
              ]

      # Module Types
      .state 'moduletypes',
        url: '/moduletypes'
        templateUrl: 'views/moduletypes/index.html'
        controller: 'ModuleTypesController'
        resolve:
          types: [
            'ModuleTypes'
            (ModuleTypes) -> ModuleTypes.$get()
          ]
      .state 'moduletypes.detail',
        url: '^/moduletypes/:id'
        views:
          detail:
            templateUrl: 'views/moduletypes/detail.html'
            controller: 'ModuleTypeController'
            resolve:
              type: [
                'types', '$stateParams'
                (types, $stateParams) ->
                  _.filter(types, (type) ->
                    type.$attributes.id is Number $stateParams.id
                  )[0]
              ]

      .state 'groups',
        url: '/modulegroups'
        templateUrl: 'views/modulegroups/index.html'
        controller: 'ModuleGroupsController'
        resolve:
          groups: [
            'ModuleGroups'
            (ModuleGroups) -> ModuleGroups.fetchAll()
          ]


      # Rules
      .state 'rules',
        url: '/rules'
        templateUrl: 'views/rules.html'
        controller: 'RulesController'
        resolve:
          rules: [
            'Rules'
            (Rules) -> Rules.fetchAll()
          ]
      .state 'rules.detail',
        url: '^/rules/:id'
        views:
          detail:
            templateUrl: 'views/rules/rule.html'
            controller: 'RuleController'
            resolve:
              rule: [
                'rules', '$stateParams'
                (rules, $stateParams) ->
                  console.log rules
                  _.filter(rules, (rule) ->
                    rule.id is Number $stateParams.id
                  )[0]
              ]
              modules: [
                'Modules'
                (Modules) -> Modules.$get()
              ]
              types: [
                'ModuleTypes'
                (ModuleTypes) -> ModuleTypes.$get()
              ]
      .state 'rules.new',
        url: '^/rules/new'
        views:
          detail:
            templateUrl: 'views/rules/rule.html'
            controller: 'RuleController'

      $urlRouterProvider.otherwise '/'
