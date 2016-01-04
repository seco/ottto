'use strict'

angular
  .module 'OtttoApp'
  .controller 'RuleActionController', [
    '$scope'
    '$q'
    'Modules'
    'ModuleTypes'
    (
      $scope
      $q
      Modules
      ModuleTypes
    ) ->

      $scope.init = ->
        $q
          .all([ Modules.$get(), ModuleTypes.fetchAll() ])
          .then( setup )


      setup = (results) ->
        $scope.modules = results[0]
        $scope.types = results[1]

        $scope.$watch 'action.module', onModule
        $scope.$watch 'action.method', onMethod


      onModule = (id) ->
        return unless id

        for module in $scope.modules when module.$attributes.id is id
          $scope.methods = module.$attributes.type.methods


      onMethod = (name) ->
        return unless name

        for method in $scope.methods when method.name is name
          $scope.method = method


      do $scope.init
  ]