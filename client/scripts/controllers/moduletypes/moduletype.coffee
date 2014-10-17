'use strict'

angular.module('OtttoApp')
  .controller 'ModuleTypeController', ($scope) ->

    $scope.init = ->
      # do fetch

    $scope.save = ->
      $scope.active.$save()


    $scope.cancel = ->
      delete $scope.active


    $scope.delete = ->
      $scope.active.$destroy()
      delete $scope.active


    $scope.addAttribute = ->
      $scope.active.attributes = new Array if not Array.isArray $scope.active.attributes
      $scope.active.attributes?.push {}


    $scope.addMethod = ->
      $scope.active.methods = new Array if not Array.isArray $scope.active.methods
      $scope.active.methods?.push {}


    # fetch = ->