(function() {
	var User = function(props){
		this.id =  props.id;
		this.parent = props.parent;
		this.level = props.level;
		this.levelIndex = props.levelIndex;
		this.kids = 0; 
		this.money= 0;
	}

	var users = [];


	var app = angular.module("ponzi", []);

	app.controller("CourtCtrl", function($scope, StylingService) {

		$scope.users = users;
		$scope.appCost = 5; 
		$scope.parentShare = 0.2; 
		$scope.levelCounts = [1];
		
		$scope.getLevelStyle = StylingService.levelStyle;
		$scope.getBallStyle = function(id){
			var clickedUser = users[id];
			return StylingService.ballStyle(clickedUser, $scope.levelCounts[clickedUser.level]);
		}; 

		var firstUser = new User(
			{id: 0,
			 parent: null,
			 level: 0,
			 levelIndex: 0
			});

		users.push(firstUser);


		$scope.userClick = function(id) {
			
			//make new user
			var self = users[id];
			self.kids += 1; 
			var currentLevel = self.level + 1; 
			var currentLevelExists = (typeof $scope.levelCounts[currentLevel] != "undefined");

			var newUser = new User(
				{id: $scope.users.length,
				 parent: id,
				 level: currentLevel,
				 levelIndex: currentLevelExists ? $scope.levelCounts[currentLevel] : 0
				});

			//distribute money to clicked item
			var selfShare = $scope.appCost * $scope.parentShare
			self.money +=  selfShare;

			var moneyLeft = $scope.appCost - selfShare;
			var ancestor = users[self.parent];


			while(moneyLeft > 0 && typeof ancestor != "undefined"){
				var ancestorShare = moneyLeft * $scope.parentShare;
				ancestor.money += ancestorShare;
				moneyLeft -=  ancestorShare;
				ancestor = users[ancestor.parent];

			}
			
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