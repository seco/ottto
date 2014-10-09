'use strict'

angular.module('OtttoApp')
  .controller 'RuleActionController', ($scope, $q, Modules, ModuleTypes) ->

    $scope.init = ->
      $q
        .all([ Modules.fetchAll(), ModuleTypes.fetchAll() ])
        .then( setup )


    setup = (results) ->
      $scope.modules = results[0]
      $scope.types = results[1]


    do $scope.init
