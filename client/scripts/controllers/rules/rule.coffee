'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:RuleController
 # @description
 # # RuleCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'RuleController', ($scope, Modules, ModuleTypes) ->

    $scope.init = ->


    $scope.addCondition = ->
      $scope.rule.conditions.push {}


    $scope.removeCondition = (condition) ->
      $scope.rule.conditions.splice $scope.rule.conditions.indexOf(condition), 1


    $scope.addAction = ->
      $scope.rule.actions.push {}


    $scope.removeAction = (action) ->
      $scope.rule.actions.splice $scope.rule.actions.indexOf(action), 1


    $scope.save = ->
      $scope.rule.$save()


    $scope.cancel = ->
      delete $scope.rule


    $scope.delete = ->
      $scope.rule.$destroy().then fetch
      delete $scope.rule


    do $scope.init
