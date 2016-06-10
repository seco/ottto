angular
  .module 'OtttoApp'
  .controller 'ModuleTypeController', [
    '$scope', 'type'
    ($scope, type) ->

      $scope.dataTypes = [
        'boolean'
        'float'
        'string'
        'radios'
        'checkboxes'
      ]

      init = ->
        $scope.type = type

        $scope.$watch 'type.$attributes', $scope.save, true


      $scope.save = (newType, oldType) ->
        return unless newType


        if $scope.type.$new()
          $scope.type.$create()
        else
          $scope.type.$save()


      $scope.delete = ->
        window.confirm(
          "Are you sure you want to get rid of #{$scope.type.$attributes.name}?"
          $scope.type.$destroy
        )


      $scope.addAttribute = ->
        if not Array.isArray $scope.type.attributes
          $scope.type.$attributes.attributes = new Array
        $scope.type.$attributes.attributes?.push {}


      $scope.addMethod = ->
        if not Array.isArray $scope.type.methods
          $scope.type.$attributes.methods = new Array
        $scope.type.$attributes.methods?.push {}


      do init
  ]
