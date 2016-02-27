(function() {

	var app = angular.module("ponzi", []);

	app.controller("PageCtrl", function($scope, StylingService, FinancialService) {

		$scope.appCost = FinancialService.appCost; 
		$scope.parentShare = FinancialService.parentShare; 
		$scope.remainder = FinancialService.remainder;
		$scope.users = FinancialService.users;
		$scope.levelCounts = FinancialService.levelCounts;
		$scope.userClick = FinancialService.makeChild;
		
		$scope.getLevelStyle = StylingService.levelStyle;
		$scope.getBallStyle = function(id){
			var clickedUser = $scope.users[id];
			return StylingService.ballStyle(clickedUser, FinancialService.levelCounts[clickedUser.level]);
		}; 
	})
    .directive('ponzi', function(){
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'scripts/ponzi.html',
        controller: 'PageCtrl'
      };
    })

})();