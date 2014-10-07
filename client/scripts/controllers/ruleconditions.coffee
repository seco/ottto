'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:RulesCtrl
 # @description
 # # RulesCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'RuleConditionsController', ($scope) ->

    $scope.init = ->
      $scope.$watch 'condition.module', onModule
      $scope.$watch 'condition.value', onValue


    onModule = (mod) ->
      $scope.values = module.type.values for module in $scope.modules when module.id is mod


    onValue = (val) ->
      $scope.value = value for value in $scope.values when value.name is val


    do $scope.init
