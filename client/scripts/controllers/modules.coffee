'use strict'

angular.module('otttoApp')
  .controller 'ModulesController', ($scope, Modules, ModuleTypes, ModuleGroups) ->

    $scope.init = ->
      do fetch

    
    $scope.activate = (active) ->
      $scope.active = active


    $scope.blank = ->
      $scope.active = new Modules
      window.active = $scope.active


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
      ModuleGroups.fetchAll().then (groups) -> $scope.groups = groups
    

    do $scope.init