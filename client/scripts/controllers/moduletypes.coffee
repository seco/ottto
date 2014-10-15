'use strict'

angular.module('OtttoApp')
  .controller 'ModuleTypesController', ($scope, ModuleTypes) ->

    $scope.valueTypes = [
      'boolean'
      'float'
      'string'
      'radios'
      'checkboxes'
    ]

    $scope.init = ->
      do fetch


    $scope.activate = (active) ->
      $scope.active = active


    $scope.new = ->
      $scope.active = new ModuleTypes


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


    $scope.addOption = (value) ->
      value.options = new Array if not Array.isArray value.options
      value.options?.push {}




    fetch = ->
      ModuleTypes.fetchAll().then (types) -> $scope.types = types


    do $scope.init
