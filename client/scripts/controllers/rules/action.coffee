'use strict'

angular
  .module 'OtttoApp'
  .controller 'RuleActionController', [
    '$scope'
    (
      $scope
    ) ->

      $scope.init = ->
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