angular.module('app.controllers', [])
//i think this has something to do with why monitor.controller.js isn't working (bc in app.js, its set to have controllers at app.controllers, which directs it here..)

.controller('DashCtrl', function($scope) {})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  // $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
