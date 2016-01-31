angular
  .module 'OtttoApp'
  .controller 'RuleConditionController', [
    '$scope'
    ($scope) ->

      $scope.init = ->
        $scope.$watch 'condition.module', onModule
        $scope.$watch 'condition.attribute', onAttribute


      onModule = (newModule, oldModule) ->
        return unless newModule

        unless newModule is oldModule
          $scope.attribute = undefined

        for module in $scope.modules when module.$attributes.id is newModule
          $scope.attributes = module.$attributes.type.attributes


      onAttribute = (newAttribute, oldAttribute) ->
        return unless newAttribute

        unless newAttribute is oldAttribute
          $scope.condition.arguments = []

        for attribute in $scope.attributes when attribute.name is newAttribute
          $scope.attribute = attribute


      $scope.remove = ->
        $scope.condition.$destroy().then ->
          $scope.rule.conditions.remove $scope.condition


      do $scope.init
  ]