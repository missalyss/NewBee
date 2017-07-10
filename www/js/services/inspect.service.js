angular.module('app.service-inspect', [])

.factory('inspectionService', function ($http, $stateParams) {
  const apiUrl = 'https://internet-of-stings.herokuapp.com/inspections'
  return {
    all: function() {
      return $http.get(apiUrl)
    },
    // thisLog: function() {
    //   return $http.get(`${apiUrl}/${id}`)
    // }
  }
})
