angular.module('app.causes', [])

.controller('causesCtrl', function ($scope, $state, causesService) {

  $scope.$on('$ionicView.enter', function() {
    causesService.all().then(result => {
      $scope.causes = result.data
      console.log($scope.causes);
    })
  })

  $scope.showCause = function (cause) {
      $state.go('tab.resources-causes-show', {id: cause.id})
    }
})

.controller('causesShowCtrl', function ($scope, $stateParams, causesService) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.thisCause = []

    causesService.all().then(result => {
      $scope.thisCause = result.data.filter(term => {
        return term.id == id
      })
      $scope.thisCause = $scope.thisCause[0]
    })
  })

})
