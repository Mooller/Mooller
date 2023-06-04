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
				window.open("https://github.com/Mooller/Mooller", '_blank');
			},
			report: function(){
				window.open =("https://www.20minutos.es/noticia/5103752/0/eeuu-ordena-matar150-vacas-salvajes-disparando-helicopteros/", '_blank');
			},
			return: function(){
				window.location.href ="../";
			},

		}
	});

}();