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

.controller('symptomsShowCtrl', function ($scope, $stateParams, $state, beeMDService, voting) {
  const id = $stateParams.id

  $scope.$on('$ionicView.enter', function() {
    $scope.theseCauses = []


    beeMDService.one('symptoms', id).then(result => {


      let symp = result.data[0]
      $scope.thisSymptom = {symptom: symp.symptom, symptom_id: symp.symptom_id, symptom_gloss_id: symp.symptom_gloss_id, details: symp.details}

      beeMDService.one('glossary', symp.symptom_gloss_id).then(glossDef => {
        $scope.thisSymptom.glossDef = glossDef.data[0].meaning
      })

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

})
