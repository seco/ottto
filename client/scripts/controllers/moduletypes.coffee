'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:ModuletypesCtrl
 # @description
 # # ModuletypesCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'ModuletypesCtrl', ($scope, ModuleTypes) ->

    $scope.init = ->
      ModuleTypes.fetchAll().then (types) -> $scope.types = types


    $scope.activate = (active) ->
      $scope.active = active


    $scope.blank = ->
      $scope.active = {}


    $scope.save = ->
      do $scope.active.save


    $scope.cancel = ->
      delete $scope.active


    $scope.delete = ->
      console.log $scope.active
      do $scope.active.remove


    do $scope.init
