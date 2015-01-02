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

      $scope.$watch 'condition.module', onModule
      $scope.$watch 'condition.attribute', onAttribute


    onModule = (id) ->
      return unless id
      $scope.attributes = module.type.attributes for module in $scope.modules when module.id is id


    onAttribute = (name) ->
      return unless name
      $scope.attribute = attribute for attribute in $scope.attributes when attribute.name is name


    $scope.remove = ->
      $scope.condition.$destroy().then ->
        $scope.rule.conditions.remove $scope.condition


    do $scope.init
