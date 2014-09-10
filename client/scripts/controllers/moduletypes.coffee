'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:ModuletypesCtrl
 # @description
 # # ModuletypesCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'ModuletypesCtrl', ($scope, Restangular) ->
    types = Restangular.service 'moduletypes'

    $scope.init = ->
      $scope.types = types.getList().$object


    $scope.activate = (type) ->
      $scope.type = type


    $scope.blank = ->
      $scope.type = {}


    $scope.save = ->
      do $scope.type.save


    $scope.cancel = ->
      delete $scope.type


    $scope.delete = ->
      console.log $scope.type
      do $scope.type.remove


    do $scope.init
