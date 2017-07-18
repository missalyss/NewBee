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

.factory('beeMDService', function ($http, BEE_MD_ENDPOINT) {
  return {
    all: function(ext) {
      return $http.get(`${BEE_MD_ENDPOINT.url}/${ext}`)
    },
    one: function(ext, id) {
      return $http.get(`${BEE_MD_ENDPOINT.url}/${ext}/${id}`)
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

.factory('voting', function ($http, BEE_MD_ENDPOINT) {
  return {
    vote: function (ext, id, body) {
      return $http.put(`${BEE_MD_ENDPOINT.url}/joins/${ext}/${id}`, body)
    }
  }
})
