'use strict'

angular.module('OtttoApp')
  .controller 'ModuleTypeAdjectiveController', ($scope) ->

    $scope.init = ->
      # do fetch


    $scope.removeAdjective = ->
      $scope.active.adjectives.splice( $scope.active.adjectives.indexOf($scope.adjective), 1 )


    $scope.addOption = ->
      $scope.adjective.options = new Array if not Array.isArray $scope.adjective.options
      $scope.adjective.options?.push {}


    $scope.removeOption = (option) ->
      $scope.adjective.options.splice( $scope.adjective.options.indexOf(option), 1 )


    # fetch = ->