'use strict'

angular.module('OtttoApp')
  .controller 'ModuleTypeController', ($scope) ->

    $scope.init = ->
      # do fetch

    $scope.save = ->
      $scope.active.$save().then fetch


    $scope.cancel = ->
      delete $scope.active


    $scope.delete = ->
      $scope.active.$destroy().then fetch
      delete $scope.active


    $scope.addAdjective = ->
      $scope.active.adjectives = new Array if not Array.isArray $scope.active.adjectives
      $scope.active.adjectives?.push {}


    $scope.removeAdjective = (adjective) ->
      $scope.active.adjectives.splice( $scope.active.adjectives.indexOf(adjective), 1 )


    $scope.addVerb = ->
      $scope.active.verbs = new Array if not Array.isArray $scope.active.verbs
      $scope.active.verbs?.push {}


    $scope.removeVerb = (verb) ->
      $scope.active.verbs.splice( $scope.active.verbs.indexOf(verb), 1 )


    # fetch = ->