app.views.fblogin = Backbone.View.extend({

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        "click .login": "login"
    },

    login: function (event) {
        console.log("Login call");
        FB.login(

                         function (response) {
                             if (response.authResponse) {
                                 alert('logged in');

                                 app.router.navigate("destination", { trigger: true });
                             } else {
                                 alert(response.authResponse + ' not logged in');
                             }
                         },
                         { scope: "email" }
                         );

    }
});