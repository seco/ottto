'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:RulesCtrl
 # @description
 # # RulesCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'RuleConditionController', ($scope, $q, Modules, ModuleTypes) ->


    $scope.init = ->
      $q
        .all([ Modules.fetchAll(), ModuleTypes.fetchAll() ])
        .then( setup )


    setup = (results) ->
      $scope.modules = results[0]
      $scope.types = results[1]

      $scope.$watch 'condition.module', onModule
      $scope.$watch 'condition.value', onValue


    onModule = (id) ->
      return unless id
      $scope.values = module.type.values for module in $scope.modules when module.id is id


    onValue = (name) ->
      return unless name
      $scope.value = value for value in $scope.values when value.name is name


    do $scope.init
