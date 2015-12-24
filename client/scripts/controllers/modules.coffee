angular
  .module 'OtttoApp'
  .controller 'ModulesController', ($scope, Module, Modules) ->

    modules = new Modules

    $scope.init = ->
      do fetch


    $scope.activate = (active) ->
      $scope.module = active


    $scope.isActive = (module) ->
      $scope.module is module


    $scope.new = ->
      $scope.module = new Module


    $scope.cancel = ->
      $scope.module = undefined


    fetch = ->
      modules.$get().then (modules) ->
        $scope.modules = modules


    do $scope.init