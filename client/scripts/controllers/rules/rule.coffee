'use strict'

angular.module('OtttoApp')
  .controller 'RuleController', ($scope, $q, Modules, ModuleTypes, RuleConditions) ->

    # $scope.init = ->


    $scope.addCondition = ->
      $scope.rule.conditions.push new RuleConditions rule: $scope.rule.id


    $scope.removeCondition = (condition) ->
      condition.$destroy().then ->
        $scope.rule.conditions.splice $scope.rule.conditions.indexOf(condition), 1


    $scope.addAction = ->
      $scope.rule.actions.push {}


    $scope.removeAction = (action) ->
      $scope.rule.actions.splice $scope.rule.actions.indexOf(action), 1


    $scope.save = ->
      $q
        .all( condition.$save() for condition in $scope.rule.conditions )
        # .then( $scope.rule.$save() )


    $scope.cancel = ->
      delete $scope.rule


    $scope.delete = ->
      do $scope.rule.$destroy
      delete $scope.rule


    # do $scope.init
