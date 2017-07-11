angular.module('app.auth-services', [])

.factory('authService', function($http) {
  const apiUrl = 'https://internet-of-stings.herokuapp.com/users'
  var LOCAL_TOKEN_KEY = 'yourTokenKey'
  var isAuthenticated = false
  var authToken

  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY)
    if (token) {
      useCredentials(token)
    }
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token)
    useCredentials(token)
  }

  function useCredentials(token) {
    isAuthenticated = true
    authToken = token
    $http.defaults.headers.common.Authorization = authToken
  }

  function logout() {
    authToken = undefined
    isAuthenticated = false
    $http.defaults.headers.common.Authorization = undefined
    window.localStorage.removeItem(LOCAL_TOKEN_KEY)
  }

  var signup = function(user) {
    return  $http.post(`${apiUrl}/signup`, user)
      // .then(function(result) {
      //   if (result.data.success) {
      //     resolve(result.data.msg)
      //   } else {
      //     reject(result.data.msg)
      //   }
      // })
  }

  var login = function(user) {
      return $http.post(`${apiUrl}/login`, user)
      // .then(function(result) {
      //   if (result.data.success) {
      //     storeUserCredentials(result.data.token)
      //     resolve(result.data.msg)
      //   } else {
      //     reject(result.data.msg)
      //   }
      // })
  }

  loadUserCredentials()

  return {
    login: login,
    signup: signup,
    logout: logout,
    isAuthenticated: function() {return isAuthenticated},
  }
})

// .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
//   return {
//     responseError: function (response) {
//       $rootScope.$broadcast({
//         401: AUTH_EVENTS.notAuthenticated,
//       }[response.status], response)
//       return $q.reject(response)
//     }
//   }
// })
//
// .config(function ($httpProvider) {
//   $httpProvider.interceptors.push('AuthInterceptor')
// })
