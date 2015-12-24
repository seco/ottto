'use strict'

angular
  .module 'OtttoApp'
  .controller 'ModuleController', ($scope, ModuleTypes, ModuleGroups) ->

    $scope.init = ->
      do fetch

      $scope.$watch 'module', $scope.save, true


    $scope.save = ->
      $scope.module.$save()


    $scope.delete = ->
      $scope.module.$destroy()


    fetch = ->
      ModuleTypes.fetchAll().then (types) -> $scope.types = types
      ModuleGroups.fetchAll().then (groups) -> $scope.groups = groups


    do $scope.init