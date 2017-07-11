angular.module('app.dash', [])

.controller('dashCtrl', function($scope, inspectionService) {
  inspectionService.all().then(result => {
    $scope.recentInspections = result.data
  })})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  // $scope.chat = Chats.get($stateParams.chatId);
})
