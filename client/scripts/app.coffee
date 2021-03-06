angular
  .module('OtttoApp', [
    'ui.router'
    'ngResource'
    'ngSails'
    'ActiveRecord'
    'mqtt'
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
      .state 'moduletypes.new',
        url: '^/moduletypes/new'
        views:
          detail:
            templateUrl: 'views/moduletypes/detail.html'
            controller: 'ModuleTypeController'
            resolve:
              type: [
                'ModuleType'
                (ModuleType) -> new ModuleType
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
        templateUrl: 'views/rules/index.html'
        controller: 'RulesController'
        resolve:
          rules: [
            'Rules'
            (Rules) -> Rules.fetchAll()
          ]
      .state 'rules.new',
        url: '^/rules/new'
        views:
          detail:
            templateUrl: 'views/rules/rule.html'
            controller: 'RuleController'
            resolve:
              rule: [
                'Rules'
                (Rules) -> new Rules
              ]
              modules: [
                'Modules'
                (Modules) -> Modules.$get()
              ]
              types: [
                'ModuleTypes'
                (ModuleTypes) -> ModuleTypes.$get()
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

      $urlRouterProvider.otherwise '/'
