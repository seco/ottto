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

        if $scope.module.$dirty() then $scope.module.$save()


      $scope.delete = ->
        $scope.module.$destroy()


      do $scope.init
  ]