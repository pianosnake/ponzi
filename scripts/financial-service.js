(function() {

var User = function(props) {
	this.id = props.id;
	this.parent = props.parent;
	this.level = props.level;
	this.levelIndex = props.levelIndex;
	this.kids = 0;
	this.money = 0;
}

var firstUser = new User({
	id: 0,
	parent: null,
	level: 0,
	levelIndex: 0
});

var users = [firstUser];
var levelCounts = [1];
var appCost = 5;
var parentShare = 0.2;
var remainder = 0;

angular.module("ponzi").service("FinancialService", function() {

	this.users = users;
	this.levelCounts = levelCounts;
	this.appCost = appCost;
	this.parentShare = parentShare;
	this.remainder = function(){return remainder};


	this.makeChild = function(id) {

		//make new user
		var clickedUser = users[id];
		clickedUser.kids += 1;
		var currentLevel = clickedUser.level + 1;
		var currentLevelExists = (typeof levelCounts[currentLevel] != "undefined");

		var newUser = new User({
			id: users.length,
			parent: id,
			level: currentLevel,
			levelIndex: currentLevelExists ? levelCounts[currentLevel] : 0
		});
		users.push(newUser);

		//distribute money
		var clickedUserShare = appCost * parentShare
		clickedUser.money += clickedUserShare;

		var moneyLeft = appCost - clickedUserShare;
		var ancestor = users[clickedUser.parent];

		while (moneyLeft > 0 && typeof ancestor != "undefined") {
			var ancestorShare = moneyLeft * parentShare;
			ancestor.money += ancestorShare;
			moneyLeft -= ancestorShare;
			ancestor = users[ancestor.parent];

		}
		remainder += moneyLeft;

		//update number of items in current level
		if (currentLevelExists) {
			levelCounts[currentLevel] += 1;
		} else {
			levelCounts[currentLevel] = 1;
		}
		
	}

})

})();