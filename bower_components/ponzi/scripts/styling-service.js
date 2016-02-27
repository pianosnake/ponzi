(function() {


	angular.module("ponzi").service("StylingService", function() {

		this.ballStyle = function(user, totalNeighbors) {
				var radius = 50 * user.level;

				//calculate the angle based on this items position among its neighbors
				var angle = 6.2832 * ((user.levelIndex + 1) / totalNeighbors);

				var x = radius * Math.cos(angle);
				var y = radius * Math.sin(angle);

				//todo: set size or color based on money?
				return {
					left: x + "px",
					top: y + "px"
				}
			};

			this.levelStyle = function(level) {
				var size = level * 100;
				var offset = -(size / 2 - 20);
				return {
					width: size + "px",
					height: size + "px",
					"margin-left": offset + "px",
					"margin-top": offset + "px"
				}

		}
	})
})();