'use strict'

angular.module('otttoApp')
  .controller 'ModulesCtrl', ($scope, Modules, ModuleTypes) ->

    $scope.init = ->
      do fetch

    
    $scope.activate = (module) ->
      $scope.active = module


    $scope.blank = ->
      $scope.active = new Modules


    $scope.save = ->
      $scope.active.$save().then fetch


    $scope.cancel = ->
      delete $scope.active


    $scope.delete = ->
      $scope.active.$destroy().then fetch
      delete $scope.active


    fetch = ->
      Modules.fetchAll().then (modules) -> $scope.modules = modules
      ModuleTypes.fetchAll().then (types) -> $scope.types = types
    

    do $scope.init