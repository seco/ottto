angular
  .module 'OtttoApp'
  .controller 'ModuleController', [
    '$scope', '$stateParams', 'types', 'groups'
    ($scope, $stateParams, types, groups) ->

      $scope.init = ->
        switch $stateParams.id
          when 'new' then do setupNew
          else do setupModule

        $scope.types = types
        $scope.groups = groups


      $scope.save = (newModule, oldModule) ->
        return unless newModule

        if $scope.module.$dirty() then $scope.module.$save()


      $scope.delete = ->
        $scope.module.$destroy()


      setupNew = ->


      setupModule = ->
        $scope.module = _.filter($scope.modules, (module) ->
          module.$attributes.id is Number $stateParams.id
        )[0]

        $scope.$watch 'module.$attributes', $scope.save, true


      do $scope.init
  ]