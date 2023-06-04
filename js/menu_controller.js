var menu = function(){
	var vue_instance = new Vue({
		el: "#menuP",
		
		methods: { 
			start_game: function(){
				 window.location.href = "html/game.html";
			},
			exit: function(){
				if (confirm("Sortir?")) {
					window.location.href = "https://moodle2.udg.edu/course/view.php?id=33309";
				  }
			},
			GH: function(){
				window.location.href ="https://github.com/Mooller/Mooller";
			},

		}
	});

}();