angular
  .module 'OtttoApp'
  .controller 'ModuleTypeAttributeController', [
    '$scope'
    ($scope) ->


      $scope.remove = ->
        $scope.active.attributes.splice(
          $scope.active.attributes.indexOf($scope.attribute), 1
        )


      $scope.addOption = ->
        if not Array.isArray $scope.attribute.options
          $scope.attribute.options = new Array

        $scope.attribute.options?.push {}


      $scope.removeOption = (option) ->
        $scope.attribute.options.splice(
          $scope.attribute.options.indexOf(option), 1
        )


  ]