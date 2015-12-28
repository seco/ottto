angular
  .module 'OtttoApp'
  .controller 'ModuleController', [
    '$scope', '$stateParams', 'ModuleTypes', 'ModuleGroups'
    ($scope, $stateParams, ModuleTypes, ModuleGroups) ->

      $scope.init = ->
        do fetch

        $scope.module = _.filter($scope.modules, (module) ->
          module.$attributes.id is Number $stateParams.id
        )[0]

        $scope.$watch 'module.$attributes', $scope.save, true


      $scope.save = ->
        if $scope.module.$dirty() then $scope.module.$save()


      $scope.delete = ->
        $scope.module.$destroy()


      fetch = ->
        ModuleTypes.fetchAll().then (types) -> $scope.types = types
        ModuleGroups.fetchAll().then (groups) -> $scope.groups = groups


      do $scope.init
  ]