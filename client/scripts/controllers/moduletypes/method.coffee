angular
  .module 'OtttoApp'
  .controller 'ModuleTypeMethodController', [
    '$scope'
    ($scope) ->

      $scope.remove = ->
        $scope.active.methods.splice(
          $scope.active.methods.indexOf($scope.method), 1
        )


      $scope.addArgument = ->
        if not Array.isArray $scope.method.arguments
          $scope.method.arguments = new Array

        $scope.method.arguments?.push {}


      $scope.removeArgument = (argument) ->
        $scope.method.arguments.splice(
          $scope.attribute.arguments.indexOf(argument), 1
        )

  ]