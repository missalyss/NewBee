angular.module('app.auth-services', [])

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.constant('API_ENDPOINT', {
  url: 'https://internet-of-stings.herokuapp.com'
  // url: 'http://localhost:3111'
})

.factory('authService', function($http, API_ENDPOINT) {
  const tokenKey = 'Bee-RR-Tolken'
  var isAuthenticated = false
  var authToken

  function loadUserCredentials() {
    let token = window.localStorage.getItem(tokenKey)
    if (token) {
      useCredentials(token)
    } else {
      isAuthenticated = false
    }
    return isAuthenticated
  }

  function storeUserCredentials(token) {
    window.localStorage.setItem(tokenKey, token)
    useCredentials(token)
  }

  function useCredentials(token) {
    isAuthenticated = true
    authToken = token
    $http.defaults.headers.common.Authorization = authToken
    return isAuthenticated
  }

  function logout() {
    authToken = undefined
    isAuthenticated = false
    $http.defaults.headers.common.Authorization = undefined
    window.localStorage.removeItem(tokenKey)
  }

  var signup = function(user) {
    return $http.post(`${API_ENDPOINT.url}/users/signup`, user)
  }

  var login = function(user) {
    return $http.post(`${API_ENDPOINT.url}/users/login`, user)
  }

  loadUserCredentials()

  return {
    login: login,
    signup: signup,
    logout: logout,
    store: storeUserCredentials,
    isAuthenticated: loadUserCredentials
  }
})


.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
  return {
    responseError: function (response) {
      $rootScope.$broadcast({
        401: AUTH_EVENTS.notAuthenticated,
      }[response.status], response)
      return $q.reject(response)
    }
  }
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor')
})
