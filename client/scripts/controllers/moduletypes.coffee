'use strict'

angular.module('otttoApp')
  .controller 'ModuleTypesController', ($scope, ModuleTypes) ->

    $scope.valueTypes = [
      'boolean'
      'float'
      'string'
      'options'
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


    $scope.addValue = (type) ->
      type.values = new Array if not Array.isArray type.values
      type.values?.push {}


    $scope.addOption = (value) ->
      value.options = new Array if not Array.isArray value.options
      value.options?.push {}


    fetch = ->
      ModuleTypes.fetchAll().then (types) -> $scope.types = types


    do $scope.init
