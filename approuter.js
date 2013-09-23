app.routers.AppRouter = Backbone.Router.extend({

    routes: {
		"":							"login",
		"destination":				"city",
        "gmap/:id":           		"home",
		"xperience/:id":            "XperiencePage"
    },

	initialize:function () {
        $(document).on('.back', 'click', function(event) {
            window.history.back();
            return false;
        });
        this.firstPage = true;
    },

	
	
	login: function() {
		if (!app.loginView) {
			console.log("creating new object");
            app.loginView = new app.views.fblogin();
            this.changePage(app.loginView);
        } else {
            console.log('reusing home view');
            app.loginView.delegateEvents(); // delegate events when the view is recycled
        }
	},

   
    city: function(){
            this.changePage(new app.views.cities());
        
    	
    },
    
    home: function (id) {
		var url = globalurl+'korkmaz/get_taxonomy_posts/?taxonomy=map_location_categories&slug='+id+'';
		
		this.changePage(new app.views.map());
		$.mobile.loading( 'show', {
				textVisible: true,
				theme: 'a',
				html: ""
			});
		return $.ajax({
           url: url,
           dataType: "json",
           success: function (data) 
		   {	
				$.mobile.loading( "hide" );
			//	$('#loading').hide();
				globalplaces=data.posts;
				
				$('body').append('<script id="infoWindow-template" type="text/html"><h2><%=title %></h2><p><img src="img/rupee_32x24.png" ><%=custom_fields["maplist_display_price"][0] %></p><p><span class="icon1">3 </span> <%=custom_fields["maplist_description"][0] %></p><p><a href="#xperience/<%= id %>">Xperience Page<a></p></script>'	);		
				app.google.init(globalplaces);
           }
       });
    	console.log("changing view");
    },
	
	
	
     
 	
    XperiencePage: function (id) {
	
		$.mobile.loading( 'show', {
				textVisible: true,
				theme: 'a',
				html: ""
			});
		var url = globalurl+'get_post/?post_id='+id+'&post_type="maplist"';
		var self=this;
		return $.ajax({
           url: url,
           dataType: "json",
           success: function (data) {
			   
        	   var exp = new app.models.experience;
        	   self.changePage(new app.views.xp({model: exp.set(data.post)}));
			   $.mobile.loading( "hide" );
           }
       });
    },
    
    changePage:function (page) {
        $(page.el).attr('data-role', 'page');
        page.render();
        $('body').append($(page.el));
        var transition = $.mobile.defaultPageTransition;
        if (this.firstPage) {
            transition = 'none';
            this.firstPage = false;
        }
        $.mobile.changePage($(page.el), {changeHash:false, transition: transition});
    }
    
});
