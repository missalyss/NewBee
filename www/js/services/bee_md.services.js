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
    },
    one: function(id) {
      return $http.get(`${BEE_MD_ENDPOINT.url}/symptoms/${id}`)
    }
  }
})

.factory('causesService', function ($http, BEE_MD_ENDPOINT) {
  return {
    all: function() {
      return $http.get(`${BEE_MD_ENDPOINT.url}/causes`)
    },
    one: function(id) {
      return $http.get(`${BEE_MD_ENDPOINT.url}/causes/${id}`)
    }
  }
})

.factory('treatmentsService', function ($http, BEE_MD_ENDPOINT) {
  return {
    all: function() {
      return $http.get(`${BEE_MD_ENDPOINT.url}/treatments`)
    },
    one: function(id) {
      return $http.get(`${BEE_MD_ENDPOINT.url}/treatments/${id}`)
    }
  }
})
