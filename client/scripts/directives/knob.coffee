'use strict'

angular.module('OtttoApp')
  .directive 'knob', () ->

    restrict: 'EA'
    replace: true

    template: '<input>'

    scope:
      ngModel: '='
      knobMin: '='
      knobMax: '='
      knobStep: '='
      knobOffset: '='
      knobArc: '='
      knobRotation: '='
      knobReadOnly: '='
      knobChange: '&'

    link: ($scope, $element, $attrs) ->
      $element.knob(
        min: $scope.knobMin
        max: $scope.knobMax
        step: $scope.knobStep

        angleOffset: $scope.knobOffset
        angleArc: $scope.knobArc
        rotation: $scope.knobRotation

        readOnly: $scope.knobReadOnly
        width: $element.width()

        release: (value) -> $scope.$apply -> $scope.ngModel = value
      )