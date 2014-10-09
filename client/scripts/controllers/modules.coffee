'use strict'

angular.module('OtttoApp')
  .controller 'ModulesController', ($scope, Modules) ->

    $scope.init = ->
      do fetch


    $scope.activate = (active) ->
      $scope.module = active


    $scope.isActive = (module) ->
      $scope.module is module


    $scope.new = ->
      $scope.module = new Modules


    fetch = ->
      Modules.fetchAll().then (modules) -> $scope.modules = modules


    do $scope.init