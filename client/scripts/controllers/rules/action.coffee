'use strict'

angular
  .module 'OtttoApp'
  .controller 'RuleActionController', ($scope, $q, Modules, ModuleTypes) ->

    $scope.init = ->
      $q
        .all([ Modules.fetchAll(), ModuleTypes.fetchAll() ])
        .then( setup )


    setup = (results) ->
      $scope.modules = results[0]
      $scope.types = results[1]

      $scope.$watch 'action.module', onModule
      $scope.$watch 'action.method', onMethod


    onModule = (id) ->
      return unless id
      $scope.methods = module.type.methods for module in $scope.modules when module.id is id


    onMethod = (name) ->
      return unless name
      $scope.method = method for method in $scope.methods when method.name is name


    do $scope.init
