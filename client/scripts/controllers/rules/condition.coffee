'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:RulesCtrl
 # @description
 # # RulesCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'RuleConditionController', ($scope) ->

    $scope.init = ->
      # $scope.$watch 'condition.module', onModule
      # $scope.$watch 'condition.value', onValue


    onModule = (mod) ->
      $scope.values = module.type.values for module in $scope.modules when module.id is mod
      delete $scope.value
      delete $scope.condition.value


    onValue = (val) ->
      $scope.value = value for value in $scope.values when value.name is val
      delete $scope.condition.operator
      delete $scope.condition.argument


    do $scope.init
