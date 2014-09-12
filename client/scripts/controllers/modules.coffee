'use strict'

angular.module('otttoApp')
  .controller 'ModulesCtrl', ($scope, Restangular, Module) ->
    types = Restangular.service 'moduletypes'

    $scope.init = ->
      $scope.modules = do Module.fetch
      $scope.types = types.getList().$object

    
    $scope.activate = (module) ->
      $scope.active = module


    $scope.blank = ->
      $scope.active = {}


    $scope.save = ->
      do $scope.active.save


    $scope.cancel = ->
      delete $scope.active


    $scope.delete = ->
      console.log $scope.active
      # do $scope.active.remove
    

    do $scope.init