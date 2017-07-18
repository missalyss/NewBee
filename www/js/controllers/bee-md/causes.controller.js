angular.module('app.causes', [])

.controller('causesCtrl', function ($scope, $state, beeMDService, voting) {

  $scope.$on('$ionicView.enter', function() {
    beeMDService.all('causes').then(result => {
      $scope.causes = result.data
    })
  })

  $scope.showCause = function (cause) {
      $state.go('tab.resources-causes-show', {id: cause.id})
    }
})

.controller('causesShowCtrl', function ($scope, $stateParams, $state, beeMDService, voting) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.theseSymptoms = []
    $scope.theseTreatments = []

    beeMDService.one('causes', id).then(result => {
      let cs = result.data.causeSympt[0]
      $scope.thisCause = {cause: cs.cause, why: cs.why, cause_id: cs.cause_id, cause_gloss_id: cs.cause_gloss_id}

      result.data.causeSympt.forEach(el => {
        let csObject = {symptom_id: el.symptom_id, symptom: el.symptom, sc_id: el.sc_id, votes: el.votes}
        $scope.theseSymptoms.push(csObject)
      })

      result.data.causeTreat.forEach(el => {
        let ctObject = {treatment_id: el.treatment_id, title: el.title, ct_id: el.ct_id, votes: el.votes}
        $scope.theseTreatments.push(ctObject)
      })
    })
  })

  $scope.scUpVote = function (sc) {
    sc.votes += 1
    voting.vote('sc', sc.sc_id, {votes: sc.votes})
    .then(() => {
      console.log("Upvoting symp_cause row")
    })
  }

  $scope.scDownVote = function (sc) {
    sc.votes -= 1
    voting.vote('sc', sc.sc_id, {votes: sc.votes})
    .then(() => {
      console.log("Downvoting symp_cause row")
    })
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

  $scope.glossaryLink = function(cause_gloss_id) {
    $state.go('tab.resources-glossary-show', {id: cause_gloss_id})
  }

  $scope.symptomLink = function (symptom_id) {
    $state.go('tab.resources-symptoms-show', {id: symptom_id})
  }

  $scope.treatmentLink = function (treatment_id) {
    $state.go('tab.resources-treatments-show', {id: treatment_id})
  }

})
