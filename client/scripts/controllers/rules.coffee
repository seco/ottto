angular
  .module 'OtttoApp'
  .controller 'RulesController', [
    '$scope', 'rules'
    ($scope, rules) ->

      $scope.init = ->
        $scope.rules = rules


      do $scope.init
  ]