/*FB.Event.subscribe('auth.logout', function(response) {
         alert('auth.logout event');
         });
            
*/

var app = {
    views: {},
    models: {},
    routers: {},
    utils: {},
	adapters: {},
	google: {}
};

var globalplaces={};

var globalurl = "http://iexperience.in/api/";

console.log("Enter app router");
$(document).on("ready", function () {
    app.router = new app.routers.AppRouter();
    app.utils.templates.load(["fblogin", "cities", "map", "xp"],
        function () {
            app.router = new app.routers.AppRouter();
            Backbone.history.start();
            //FB.init({ appId: "520455088008607", nativeInterface: CDV.FB, useCachedDialogs: false });
            FB.init({ appId: "614905611858200", nativeInterface: CDV.FB, useCachedDialogs: false });
        });

        FB.Event.subscribe('auth.statusChange', function (event) {
            if (event.status === 'connected') {
                FB.api('/me', function (response) {
                    app.user = response; // Store the newly authenticated FB user
                });

                fb.slider.removeCurrentPage();
                app.router.navigate("destination", { trigger: true });
            } else {
                fb.user = null; // Reset current FB user
                fb.router.navigate("", { trigger: true });
            }
        });
        FB.Event.subscribe('auth.logout', function (response) {
            alert('auth.logout event');
        });

        FB.Event.subscribe('auth.sessionChange', function (response) {
            alert('auth.sessionChange event');
        });

        FB.Event.subscribe('auth.statusChange', function (response) {
            alert('auth.statusChange event');
        });
    });
   