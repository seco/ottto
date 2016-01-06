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

        console.log type

        $scope.$watch 'type.$attributes', $scope.save, true


      $scope.save = (newType, oldType) ->
        return unless newType

        if $scope.type.$old() and $scope.type.$dirty()
          $scope.type.$save()

        if $scope.type.$new() and $scope.type.$dirty()
          $scope.type.$create()


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
