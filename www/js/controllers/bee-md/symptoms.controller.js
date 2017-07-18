angular.module('app.symptoms', [])

.controller('symptomsCtrl', function ($scope, $state, beeMDService) {

  $scope.$on('$ionicView.enter', function() {
    beeMDService.all('symptoms').then(result => {
      $scope.symptoms = result.data
    })
  })

  $scope.showSymptom = function (symptom) {
      $state.go('tab.resources-symptoms-show', {id: symptom.symptoms_id})
    }

})

.controller('symptomsShowCtrl', function ($scope, $stateParams, $state, beeMDService, voting, $http) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.thisSymptom = {}
    $scope.theseCauses = []

    beeMDService.one('symptoms', id).then(result => {

      let currentSymp = result.data[0]
      $scope.thisSymptom = {symptom: currentSymp.symptom, symptom_id: currentSymp.symptom_id, symptom_gloss_id: currentSymp.symptom_gloss_id, details: currentSymp.details}

      result.data.forEach(el => {
        let scObj = {cause_id: el.cause_id, cause: el.cause, sc_id: el.sc_id, votes: el.votes}
        $scope.theseCauses.push(scObj)
      })
    })
  })

  $scope.glossaryLink = function(glossary_id) {
    $state.go('tab.resources-glossary-show', {id: glossary_id})
  }

  $scope.causeLink = function(cause_id) {
    $state.go('tab.resources-causes-show', {id: cause_id})
  }

  $scope.csUpVote = function (sc) {
    sc.votes += 1
    voting.vote('sc', sc.sc_id, {votes: sc.votes})
    .then(() => {
      console.log("Upvoting symp_cause row")
    })
  }

  $scope.csDownVote = function (sc) {
    sc.votes -= 1
    voting.vote('sc', sc.sc_id, {votes: sc.votes})
    .then(() => {
      console.log("Downvoting symp_cause row")
    })
  }

})
