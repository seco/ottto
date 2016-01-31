angular
  .module 'OtttoApp'
  .controller 'RuleController', [
    '$scope', 'rule', 'modules', 'types', 'RuleConditions'
    ($scope, rule, modules, types, RuleConditions) ->

      $scope.init = ->
        $scope.rule = rule
        $scope.modules = modules
        $scope.types = types


      $scope.addCondition = ->
        $scope.rule.conditions.push new RuleConditions rule: $scope.rule.id


      $scope.addAction = ->
        $scope.rule.actions.push {}


      $scope.removeAction = (action) ->
        $scope.rule.actions.remove action


      $scope.save = ->
        do $scope.rule.$save


      $scope.delete = ->
        do $scope.rule.$destroy


      do $scope.init
  ]