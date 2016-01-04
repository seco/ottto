'use strict'

angular
  .module 'OtttoApp'
  .controller 'RuleConditionController', ($scope, $q, Modules, ModuleTypes) ->

    $scope.init = ->
      $q
        .all([ Modules.$get(), ModuleTypes.fetchAll() ])
        .then( setup )


    setup = (results) ->
      $scope.modules = results[0]
      $scope.types = results[1]

      $scope.$watch 'condition.module', onModule
      $scope.$watch 'condition.attribute', onAttribute


    onModule = (id) ->
      return unless id

      for module in $scope.modules when module.$attributes.id is id
        $scope.attributes = module.$attributes.type.attributes


    onAttribute = (name) ->
      return unless name

      for attribute in $scope.attributes when attribute.name is name
        $scope.attribute = attribute


    $scope.remove = ->
      $scope.condition.$destroy().then ->
        $scope.rule.conditions.remove $scope.condition


    do $scope.init
