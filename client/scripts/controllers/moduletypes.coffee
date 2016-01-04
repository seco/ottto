'use strict'

angular
  .module 'OtttoApp'
  .controller 'ModuleTypesController', [
    '$scope', 'types', 'ModuleType'
    ($scope, types, ModuleType) ->

      $scope.init = ->
        $scope.types = types


      $scope.activate = (active) ->
        $scope.active = active


      $scope.new = ->
        $scope.active = new ModuleType


      do $scope.init
  ]