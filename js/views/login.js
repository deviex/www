app.views.fblogin = Backbone.View.extend({
   

    render: function () {
        this.$el.html(this.template());
        return this;
    },
	
	events: {
        "click .login": "login"
    },

    login: function(event) {
    		console.log("Login call");
			FB.login(
						
                         function(response) {
                         if (response.session) {
                         alert('logged in');
                         } else {
                         alert('not logged in');
                         }
                         },
                         { scope: "email" }
                         );
	
    }
});