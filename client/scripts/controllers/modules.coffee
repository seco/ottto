'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:ModulesCtrl
 # @description
 # # ModulesCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'ModulesCtrl', ($scope, Restangular, ModulesService) ->
    modules = Restangular.service 'modules'
    types = Restangular.service 'moduletypes'

    $scope.init = ->
      $scope.modules = modules.getList().$object
      $scope.types = types.getList().$object

    
    $scope.activate = (module) ->
      $scope.module = module


    $scope.blank = ->
      $scope.module = {}


    $scope.save = ->
      do $scope.module.save


    $scope.cancel = ->
      delete $scope.module


    $scope.delete = ->
      console.log $scope.module
      do $scope.module.remove
    

    do $scope.init