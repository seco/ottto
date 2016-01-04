angular
  .module 'OtttoApp'
  .controller 'ModuleGroupsController', [
    '$scope', 'groups', 'ModuleGroups'
    ($scope, groups, ModuleGroups) ->

      $scope.init = ->
        $scope.groups = groups


      $scope.new = ->
        $scope.groups.push new ModuleGroups


      do $scope.init
  ]