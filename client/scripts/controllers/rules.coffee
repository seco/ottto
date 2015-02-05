'use strict'

angular.module('OtttoApp')
  .controller 'RulesController', ($scope, Rules) ->

    $scope.init = ->
      do fetch


    fetch = ->
      Rules.fetchAll().then (rules) ->
        $scope.rules = rules


    do $scope.init
