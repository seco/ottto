angular
  .module 'OtttoApp'
  .controller 'ModulesController', [
    '$scope', 'modules'
    ($scope, modules) ->

      $scope.modules = modules

  ]