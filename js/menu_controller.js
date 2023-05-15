var menu = new Vue({
    el: '#menu',
    data: {

    },
    methods: {
        play: function () {
            console.log("funciona");
            window.location.href = "html/game.html";
        }
    }
})