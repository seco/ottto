'use strict'

angular.module('OtttoApp')
  .controller 'ModuleTypeAttributeController', ($scope) ->

    $scope.init = ->


    $scope.remove = ->
      $scope.active.attributes.splice( $scope.active.attributes.indexOf($scope.attribute), 1 )


    $scope.addOption = ->
      $scope.attribute.options = new Array if not Array.isArray $scope.attribute.options
      $scope.attribute.options?.push {}


    $scope.removeOption = (option) ->
      $scope.attribute.options.splice( $scope.attribute.options.indexOf(option), 1 )


    do $scope.init