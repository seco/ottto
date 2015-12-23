'use strict'

angular
  .module 'OtttoApp'
  .controller 'ModuleController', ($scope, ModuleTypes, ModuleGroups) ->

    $scope.init = ->
      do fetch


    $scope.save = ->
      $scope.module.$save().then fetch


    $scope.cancel = ->
      delete $scope.module


    $scope.delete = ->
      $scope.module.$destroy().then fetch
      delete $scope.module


    fetch = ->
      ModuleTypes.fetchAll().then (types) -> $scope.types = types
      ModuleGroups.fetchAll().then (groups) -> $scope.groups = groups


    do $scope.init