'use strict'

angular.module('otttoApp')
  .controller 'ModuleGroupsController', ($scope, ModuleGroups) ->

    $scope.init = ->
      do fetch


    $scope.activate = (active) ->
      $scope.active = active


    $scope.blank = ->
      $scope.active = new ModuleGroups


    $scope.save = ->
      $scope.active.$save().then fetch


    $scope.cancel = ->
      delete $scope.active


    $scope.delete = ->
      $scope.active.$destroy().then fetch
      delete $scope.active


    fetch = ->
      ModuleGroups.fetchAll().then (groups) -> $scope.groups = groups


    do $scope.init
