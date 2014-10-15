'use strict'

angular.module('OtttoApp')
  .controller 'ModuleTypeAdjectiveController', ($scope) ->

    $scope.init = ->
      # do fetch


    $scope.addOption = () ->
      $scope.adjective.options = new Array if not Array.isArray $scope.adjective.options
      $scope.adjective.options?.push {}


    # fetch = ->