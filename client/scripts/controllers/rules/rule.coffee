'use strict'

angular
  .module 'OtttoApp'
  .controller 'RuleController', ($scope, $window, $routeParams, $q, Rules, RuleConditions, Modules, ModuleTypes) ->

    $scope.init = ->
      do fetch


    $scope.addCondition = ->
      $scope.rule.conditions.push new RuleConditions rule: $scope.rule.id


    $scope.addAction = ->
      $scope.rule.actions.push {}


    $scope.removeAction = (action) ->
      $scope.rule.actions.remove action


    $scope.save = ->
      $scope.rule.$save().then ->
        $window.location.href = '/#/rules'
      # $q
      #   .all( condition.$save() for condition in $scope.rule.conditions )
      #   .then ->
      #     $scope.rule.$save().then ->
      #       $window.location.href = '/#/rules'


    $scope.cancel = ->
      $window.location.href = '/#/rules'


    $scope.delete = ->
      do $scope.rule.$destroy
      $window.location.href = '/#/rules'


    fetch = ->
      if $routeParams.id isnt 'new'
        Rules.fetchOne($routeParams.id).then (rule) ->
          $scope.rule = rule
      else
        $scope.rule = new Rules {}


    do $scope.init