'use strict'

angular
  .module 'OtttoApp'
  .controller 'RuleConditionController', [
    '$scope'
    (
      $scope
    ) ->

      $scope.init = ->
        $scope.$watch 'condition.module', onModule
        $scope.$watch 'condition.attribute', onAttribute


      onModule = (id) ->
        return unless id

        for module in $scope.modules when module.$attributes.id is id
          $scope.attributes = module.$attributes.type.attributes


      onAttribute = (name) ->
        return unless name

        for attribute in $scope.attributes when attribute.name is name
          $scope.attribute = attribute


      $scope.remove = ->
        $scope.condition.$destroy().then ->
          $scope.rule.conditions.remove $scope.condition


      do $scope.init
  ]