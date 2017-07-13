angular.module('app.auth-services', [])

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated'
})

.factory('authService', function($http) {
  // let apiUrl = 'http://localhost:3111/users'
  const apiUrl = 'https://internet-of-stings.herokuapp.com/users'
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
    return $http.post(`${apiUrl}/signup`, user)
  }

  var login = function(user) {
    return $http.post(`${apiUrl}/login`, user)
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

// function() {return isAuthenticated},

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
