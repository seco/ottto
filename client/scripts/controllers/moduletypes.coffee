'use strict'

angular.module('otttoApp')
  .controller 'ModuleTypesController', ($scope, ModuleTypes) ->

    $scope.init = ->
      do fetch


    $scope.activate = (active) ->
      $scope.active = active


    $scope.blank = ->
      $scope.active = new ModuleTypes


    $scope.save = ->
      $scope.active.$save().then fetch


    $scope.cancel = ->
      delete $scope.active


    $scope.delete = ->
      $scope.active.$destroy().then fetch
      delete $scope.active


    fetch = ->
      ModuleTypes.fetchAll().then (types) -> $scope.types = types


    do $scope.init
