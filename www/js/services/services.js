angular.module('app.services', [])

.factory('inspectionService', function ($http, API_ENDPOINT) {
  return {
    all: function() {
      return $http.get(`${API_ENDPOINT.url}/inspections`)
    }
  }
})

.factory('monitorService', function ($http, API_ENDPOINT) {
  return {
    all: function() {
      return $http.get(`${API_ENDPOINT.url}/humiture`)
    }
  }
})
