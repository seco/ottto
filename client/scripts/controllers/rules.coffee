'use strict'

angular.module('OtttoApp')
  .controller 'RulesController', ($scope, $routeParams, Rules) ->

    $scope.init = ->
      do fetch


    $scope.new = ->
      $scope.rule = new Rules


    fetch = ->
      Rules.fetchAll().then (rules) ->
        $scope.rules = rules
        $scope.rule = _(rules).find id: (Number) $routeParams.id


    do $scope.init
