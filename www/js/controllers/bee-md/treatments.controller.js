angular.module('app.treatments', [])

.controller('treatmentsCtrl', function ($scope, $stateParams, $state, beeMDService) {

  $scope.$on('$ionicView.enter', function() {
    beeMDService.all('treatments').then(result => {
      $scope.treatments = result.data
    })
  })

  $scope.showTreatment = function (treatment) {
      $state.go('tab.resources-treatments-show', {id: treatment.id})
    }
})

.controller('treatmentsShowCtrl', function ($scope, $stateParams, $state, beeMDService, voting) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.theseCauses = []

    beeMDService.one('treatments', id).then(result => {
      let treat = result.data[0]
      $scope.thisTreatment = {title: treat.title, instructions: treat.instructions, treatment_id: treat.treatment_id}

      result.data.forEach(el => {
        let ctObj = {cause_id: el.cause_id, cause: el.cause, ct_id: el.ct_id, votes: el.votes}
        $scope.theseCauses.push(ctObj)
      })
      console.log(result.data);
    })
  })

  $scope.causeLink = function(cause_id) {
    $state.go('tab.resources-causes-show', {id: cause_id})
  }

  $scope.ctUpVote = function (ct) {
    ct.votes += 1
    voting.vote('ct', ct.ct_id, {votes: ct.votes})
    .then(() => {
      console.log("Upvoting cause_treat row")
    })
  }

  $scope.ctDownVote = function (ct) {
    ct.votes -= 1
    voting.vote('ct', ct.ct_id, {votes: ct.votes})
    .then(() => {
      console.log("Downvoting cause_treat row")
    })
  }

})
