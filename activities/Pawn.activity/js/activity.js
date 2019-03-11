define(["sugar-web/activity/activity", "sugar-web/env", "sugar-web/graphics/icon"], function (activity, env, icon) {

	// Manipulate the DOM only when it is ready.
	requirejs(['domReady!'], function (doc) {

		// Initialize the activity.
		activity.setup();

		// Variables
		var currentEnv;
		var pawns = [];
		var drawPawns = function () {
			document.getElementById("pawns").innerHTML = "";
			for (var i = 0; i < pawns.length; i++) {
				var pawn = document.createElement("div");
				pawn.className = "pawn";

				document.getElementById("pawns").appendChild(pawn);
				icon.colorize(pawn, pawns[i]);
			}
		}

		// Get current user's name from `env` library
		env.getEnvironment(function(err, environment) {

			currentEnv = environment;
		
			// Load from datastore
			console.log(environment.objectId)
			if (!environment.objectId) {
				console.log("New instance");
			} else {
				console.log("Existing instance");

				// Get activity previous data
				activity.getDatastoreObject().loadAsText(function(error, metadata, data) {
					if (error==null && data!=null) {
						// Get the previous no of pawns and draw it
						pawns = JSON.parse(data);
						drawPawns();
					} else {
						console.log("Error in retrieving data from activity.getDatastoreObject")
					}
				});
			}

			document.getElementById("user").innerHTML = "<h1>"+"Hello"+" "+environment.user.name+
						   " Welcome to Pawn Activity!</h1>";
		});

		// Handle event: click on button add
		document.getElementById("add-button").addEventListener('click', function (event) {

			pawns.push(currentEnv.user.colorvalue);
			drawPawns();

			document.getElementById("user").innerHTML = "<h1>"+currentEnv.user.name+" played !</h1>";
		});

		// Save in Journal on Stop
		document.getElementById("stop-button").addEventListener('click', function (event) {
			console.log("storing data...");

			// Save current data
			var jsonData = JSON.stringify(pawns);
			activity.getDatastoreObject().setDataAsText(jsonData);

			activity.getDatastoreObject().save(function (error) {
				if (error === null) {
					console.log("Successfully stored");
				} else {
					console.log("Failed to store data");
				}
			});
		});

	});

});
