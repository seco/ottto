angular
  .module 'OtttoApp'
  .controller 'RuleActionController', [
    '$scope'
    ($scope) ->

      $scope.init = ->
        $scope.$watch 'action.module', onModule
        $scope.$watch 'action.attribute', onAttribute
        # $scope.$watch 'action.method', onMethod


      onModule = (newModule, oldModule) ->
        return unless newModule

        unless newModule is oldModule
          $scope.attribute = undefined

        for module in $scope.modules when module.$attributes.id is newModule
          $scope.attributes = module.$attributes.type.attributes


      onAttribute = (newAttribute, oldAttribute) ->
        return unless newAttribute

        unless newAttribute is oldAttribute
          $scope.action.value = undefined

        for attribute in $scope.attributes when attribute.name is newAttribute
          $scope.attribute = attribute


      # onModule = (id) ->
      #   return unless id

      # for module in $scope.modules when module.$attributes.id is id
      #   $scope.methods = module.$attributes.type.methods


      # onMethod = (name) ->
      #   return unless name

      #   for method in $scope.methods when method.name is name
      #     $scope.method = method


      do $scope.init
  ]