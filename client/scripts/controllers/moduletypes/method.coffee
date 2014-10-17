'use strict'

angular.module('OtttoApp')
  .controller 'ModuleTypeMethodController', ($scope) ->

    $scope.init = ->
      # do fetch


    $scope.remove = ->
      $scope.active.methods.splice( $scope.active.methods.indexOf($scope.method), 1 )


    # fetch = ->