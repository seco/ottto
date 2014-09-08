'use strict'

###*
 # @ngdoc function
 # @name otttoApp.controller:HeaderCtrl
 # @description
 # # HeaderCtrl
 # Controller of the otttoApp
###
angular.module('otttoApp')
  .controller 'HeaderCtrl', ($scope) ->
    $scope.awesomeThings = [
      'HTML5 Boilerplate'
      'AngularJS'
      'Karma'
    ]
