'use strict'

angular.module('OtttoApp')
  .controller 'ModuleGroupsController', ($scope, ModuleGroups) ->

    $scope.init = ->
      do fetch


    $scope.new = ->
      $scope.groups.push new ModuleGroups


    $scope.save = ->
      $scope.active.$save().then fetch


    $scope.delete = ->
      $scope.active.$destroy().then fetch


    fetch = ->
      ModuleGroups.fetchAll().then (groups) -> $scope.groups = groups


    do $scope.init
