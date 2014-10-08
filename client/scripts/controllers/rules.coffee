'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:RulesCtrl
 # @description
 # # RulesCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'RulesController', ($scope, Rules) ->

    $scope.init = ->
      do fetch


    $scope.activate = (rule) ->
      $scope.rule = rule


    fetch = ->
      Rules.fetchAll().then (rules) -> $scope.rules = rules


    do $scope.init
