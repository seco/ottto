'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:RulesCtrl
 # @description
 # # RulesCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'RulesController', ($scope, Rules, Modules, ModuleTypes) ->

    $scope.init = ->
      do fetch


    $scope.activate = (rule) ->
      $scope.active = rule


    $scope.addRule = ->
      $scope.rules.push new Rules


    $scope.addCondition = ->
      $scope.active.conditions.push {}


    $scope.removeCondition = (condition) ->
      $scope.active.conditions.splice $scope.active.conditions.indexOf(condition), 1


    $scope.addAction = ->
      $scope.active.actions.push {}


    $scope.removeAction = (action) ->
      $scope.active.actions.splice $scope.active.actions.indexOf(action), 1


    $scope.save = ->
      $scope.active.$save().then fetch


    $scope.cancel = ->
      delete $scope.active


    $scope.delete = ->
      $scope.active.$destroy().then fetch
      delete $scope.active


    fetch = ->
      Rules.fetchAll().then (rules) -> $scope.rules = rules
      Modules.fetchAll().then (modules) -> $scope.modules = modules
      ModuleTypes.fetchAll().then (modules) -> $scope.types = modules


    do $scope.init
