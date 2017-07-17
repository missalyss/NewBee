angular.module('app.bee-md-services', [])

.constant('BEE_MD_ENDPOINT', {
  // url: 'https://bee-md.herokuapp.com'
  url: 'http://localhost:4444'
})

.factory('glossaryService', function ($http, BEE_MD_ENDPOINT) {
  return {
    all: function() {
      return $http.get(`${BEE_MD_ENDPOINT.url}/glossary`)
    }
  }
})

.factory('symptomsService', function ($http, BEE_MD_ENDPOINT) {
  return {
    all: function() {
      return $http.get(`${BEE_MD_ENDPOINT.url}/symptoms`)
    }
  }
})

.factory('causesService', function ($http, BEE_MD_ENDPOINT) {
  return {
    all: function() {
      return $http.get(`${BEE_MD_ENDPOINT.url}/causes`)
    }
  }
})

.factory('treatmentsService', function ($http, BEE_MD_ENDPOINT) {
  return {
    all: function() {
      return $http.get(`${BEE_MD_ENDPOINT.url}/treatments`)
    }
  }
})
