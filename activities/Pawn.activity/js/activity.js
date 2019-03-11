define(["sugar-web/activity/activity", "sugar-web/env", "sugar-web/graphics/icon"], function (activity, env, icon) {

	// Manipulate the DOM only when it is ready.
	requirejs(['domReady!'], function (doc) {

		// Initialize the activity.
		activity.setup();

		// Variables
		var currentEnv;

		// Get current user's name from `env` library
		env.getEnvironment(function(err, environment) {

			currentEnv = environment;
			document.getElementById("user").innerHTML = "<h1>"+"Hello"+" "+environment.user.name+
						   " Welcome to Pawn Activity!</h1>";
		});

		// Handle event: click on button add
		document.getElementById("add-button").addEventListener('click', function (event) {
			var pawn = document.createElement("div");
			pawn.className = "pawn";

			document.getElementById("pawns").appendChild(pawn);
			icon.colorize(pawn, currentEnv.user.colorvalue);
			document.getElementById("user").innerHTML = "<h1>"+currentEnv.user.name+" played !</h1>";
		});

	});

});
