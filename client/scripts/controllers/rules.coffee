'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:RulesCtrl
 # @description
 # # RulesCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'RulesCtrl', ($scope) ->


    $scope.init = ->
      $scope.modules = Restangular.all('modules').getList().$object
      $scope.actions = [
        {
          id: 0
          name: 'Off'
        }
        {
          id: 1
          name: 'On'
        }
      ]


    do $scope.init
