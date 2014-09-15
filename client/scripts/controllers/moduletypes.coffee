'use strict'

angular.module('otttoApp')
  .controller 'ModuleTypesController', ($scope, ModuleTypes) ->

    $scope.valueTypes = [
      'boolean'
      'float'
      'string'
    ]

    $scope.init = ->
      do fetch


    $scope.activate = (active) ->
      $scope.active = active


    $scope.new = ->
      $scope.active = new ModuleTypes


    $scope.save = ->
      $scope.active.$save().then fetch


    $scope.cancel = ->
      delete $scope.active


    $scope.delete = ->
      $scope.active.$destroy().then fetch
      delete $scope.active


    $scope.addValue = ->
      $scope.active.values = new Array if not Array.isArray $scope.active.values
      $scope.active.values?.push {}


    fetch = ->
      ModuleTypes.fetchAll().then (types) -> $scope.types = types


    do $scope.init
