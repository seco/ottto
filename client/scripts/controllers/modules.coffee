'use strict'

angular.module('otttoApp')
  .controller 'ModulesController', ($scope, Modules) ->

    $scope.init = ->
      do fetch


    $scope.activate = (active) ->
      $scope.module = active


    $scope.new = ->
      $scope.module = new Modules


    fetch = ->
      Modules.fetchAll().then (modules) -> $scope.modules = modules


    do $scope.init