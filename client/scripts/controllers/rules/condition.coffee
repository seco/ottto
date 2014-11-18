'use strict'

angular.module('OtttoApp')
  .controller 'RuleConditionController', ($scope, $q, Modules, ModuleTypes) ->

    $scope.init = ->
      $q
        .all([ Modules.fetchAll(), ModuleTypes.fetchAll() ])
        .then( setup )


    setup = (results) ->
      $scope.modules = results[0]
      $scope.types = results[1]

      $scope.$watch 'condition.module.id', onModule
      $scope.$watch 'condition.attribute', onAttribute


    onModule = (id) ->
      console.log 'onModule1', id
      return unless id
      $scope.attributes = module.type.attributes for module in $scope.modules when module.id is id
      console.log 'onModule2', $scope.attributes


    onAttribute = (name) ->
      console.log 'onAttribute1', name
      return unless name
      $scope.attribute = attribute for attribute in $scope.attributes when attribute.name is name
      console.log 'onAttribute2', $scope.attribute


    do $scope.init
