'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:RulesCtrl
 # @description
 # # RulesCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'RulesController', ($scope) ->


    $scope.init = ->
      do fetch


    fetch = ->
      console.log 'fetching'


    do $scope.init
