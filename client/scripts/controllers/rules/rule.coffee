'use strict'

angular.module('OtttoApp')
  .controller 'RuleController', ($scope, $q, Modules, ModuleTypes, RuleConditions) ->

    # $scope.init = ->


    $scope.addCondition = ->
      $scope.rule.conditions.push new RuleConditions rule: $scope.rule.id


    $scope.addAction = ->
      $scope.rule.actions.push {}


    $scope.removeAction = (action) ->
      $scope.rule.actions.remove action


    $scope.save = ->
      $q
        .all( condition.$save() for condition in $scope.rule.conditions )
        .then ->
          $scope.rule.$save().then ->
            $scope.rules.push $scope.rule


    $scope.cancel = ->
      delete $scope.rule


    $scope.delete = ->
      do $scope.rule.$destroy
      $scope.rules.remove $scope.rule
      delete $scope.rule


    # do $scope.init
