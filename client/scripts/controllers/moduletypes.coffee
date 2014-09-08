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


    $scope.init = ->
      $scope.types = Restangular.all('moduletypes').getList().$object


    do $scope.init
