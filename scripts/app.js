(function() {
	var User = function(props){
		this.id =  props.id;
		this.parent = props.parent;
		this.level = props.level;
		this.levelIndex = props.levelIndex;
		this.money= 0;
	}

	var users = [];


	var app = angular.module("ponzi", []);

	app.controller("CourtCtrl", function($scope, StylingService) {

		$scope.clicks = 0;
		$scope.users = users;
		$scope.pot = 0; 
		$scope.appCost = 5; 
		$scope.parentShare = 1; 
		$scope.levelCounts = [1];
		
		$scope.getLevelStyle = StylingService.levelStyle;
		$scope.getBallStyle = function(id){
			var clickedUser = users[id];
			return StylingService.ballStyle(clickedUser, $scope.levelCounts[clickedUser.level]);
		}; 

		var firstUser = new User(
			{id: $scope.clicks,
			 parent: null,
			 level: 0,
			 levelIndex: 0
			});

		users.push(firstUser);

		$scope.userClick = function(id) {
			
			$scope.clicks += 1;

			//make new user
			var parent = users[id];
			var currentLevel = parent.level + 1; 
			var currentLevelExists = (typeof $scope.levelCounts[currentLevel] != "undefined");

			var newUser = new User(
			{id: $scope.clicks ,
			 parent: id,
			 level: currentLevel,
			 levelIndex: currentLevelExists ? $scope.levelCounts[currentLevel] : 0
			});

			//distribute money
			users[id].money += $scope.parentShare;
			$scope.pot += ($scope.appCost - $scope.parentShare);
			
			//update how many items are in the current level
			if(currentLevelExists){
				$scope.levelCounts[currentLevel] += 1;
			}else{
				$scope.levelCounts[currentLevel] = 1; 
			}
			users.push(newUser);
		}



		


	})

})();