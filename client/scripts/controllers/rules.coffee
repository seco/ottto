'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:RulesCtrl
 # @description
 # # RulesCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'RulesController', ($scope, Modules, ModuleTypes) ->


    $scope.rule =
      name: 'Custom Rule'
      operator: '&&'
      conditions: [{}]
      actions: []

    $scope.init = ->
      do fetch


    $scope.addCondition = ->
      $scope.rule.conditions.push {}


    $scope.removeCondition = (condition) ->
      $scope.rule.conditions.splice $scope.rule.conditions.indexOf(condition), 1


    $scope.updateValues = (condition) ->
      $scope.values = module.type.values for module in $scope.modules when module.id is condition.module


    $scope.updateOptions = (condition) ->
      $scope.value = value for value in $scope.values when value.name is condition.value


    fetch = ->
      Modules.fetchAll().then (modules) -> $scope.modules = modules
      ModuleTypes.fetchAll().then (modules) -> $scope.types = modules


    do $scope.init
