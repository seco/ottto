'use strict'

angular
  .module 'OtttoApp'
  .controller 'ModuleTypesController', ($scope, ModuleTypes) ->

    $scope.init = ->
      do fetch


    $scope.activate = (active) ->
      $scope.active = active


    $scope.new = ->
      $scope.active = new ModuleTypes


    fetch = ->
      ModuleTypes.fetchAll().then (types) -> $scope.types = types


    do $scope.init
