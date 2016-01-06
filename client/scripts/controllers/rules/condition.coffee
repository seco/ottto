angular
  .module 'OtttoApp'
  .controller 'RuleConditionController', [
    '$scope'
    ($scope) ->

      $scope.init = ->
        $scope.$watch 'condition.module', onModule
        $scope.$watch 'condition.attribute', onAttribute


      onModule = (newModule, oldModule) ->
        console.log newModule, oldModule
        unless newModule is oldModule
          console.log 'newModule is oldModule'
          $scope.attribute = undefined
        # return unless newModule

        for module in $scope.modules when module.$attributes.id is newModule
          $scope.attributes = module.$attributes.type.attributes



      onAttribute = (newAttribute, oldAttribute) ->
        unless newAttribute is oldAttribute
          $scope.condition.arguments = []
        # return unless newAttribute

        for attribute in $scope.attributes when attribute.name is newAttribute
          $scope.attribute = attribute




      $scope.remove = ->
        $scope.condition.$destroy().then ->
          $scope.rule.conditions.remove $scope.condition


      do $scope.init
  ]