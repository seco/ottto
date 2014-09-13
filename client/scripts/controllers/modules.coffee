'use strict'

angular.module('otttoApp')
  .controller 'ModulesCtrl', ($scope, Modules, ModuleTypes) ->

    $scope.init = ->
      Modules.fetchAll().then (modules) -> $scope.modules = modules
      ModuleTypes.fetchAll().then (types) -> $scope.types = types

    
    $scope.activate = (module) ->
      $scope.active = module


    $scope.blank = ->
      $scope.active = {}


    $scope.save = ->
      do $scope.active.save


    $scope.cancel = ->
      delete $scope.active


    $scope.delete = ->
      console.log $scope.active
      # do $scope.active.remove
    

    do $scope.init