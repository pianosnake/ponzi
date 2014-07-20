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

	app.controller("CourtCtrl", function($scope) {

		$scope.clicks = 0;
		$scope.users = users;
		$scope.pot = 0; 
		$scope.appCost = 5; 
		$scope.parentShare = 1; 
		$scope.levelCounts = [1];

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


		$scope.getPosition = function(id){

			var info = users[id];

			// probably put this in a positioning service
			var radius = 50 * info.level;
			var totalNeighbors = $scope.levelCounts[info.level];

			//calculate the angle based on this items position amongst its neighbors
			var angle = 6.2832 * ((info.levelIndex+1) / totalNeighbors);

			var x = radius * Math.cos(angle);
			var y = radius * Math.sin(angle);
			
			//todo: compute size or color based on money
			return{
				// left: info.levelIndex * 60 + "px",
				// top: info.level * 60 + "px",
				left: x + "px",
				top: y + "px"

			}
		}


	})

})();