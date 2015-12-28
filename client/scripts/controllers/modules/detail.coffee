angular
  .module 'OtttoApp'
  .controller 'ModuleController', [
    '$scope', 'module', 'types', 'groups'
    ($scope, module, types, groups) ->

      $scope.init = ->
        $scope.module = module
        $scope.types = types
        $scope.groups = groups

        $scope.$watch 'module.$attributes', $scope.save, true


      $scope.save = (newModule, oldModule) ->
        return unless newModule

        # if $scope.module.$new() then $scope.module.$create()
        if $scope.module.$old() and $scope.module.$dirty()
          $scope.module.$save()


      $scope.delete = ->
        window.confirm(
          "Are you sure you want to delete #{$scope.module.$attributes.name}?"
          $scope.module.$destroy
        )


      do $scope.init
  ]