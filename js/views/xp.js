app.views.xp = Backbone.View.extend({
   
    render: function () {
		console.log("Rendering");
        this.$el.html(this.template(this.model.attributes));
        return this;
    },
	
	events: {
        "click .publish": "publish",
		"click .back" : "back"
    },

	back: function(event){
		
            window.history.back();
            
		
	},
    publish: function(event) {
		
//		app.router.navigate('',{trigger: true});
		FB.api(
					  'me/iex-dev:wish',
					  'post',
					  {
					    experience: this.model.attributes.url
					  },
					  function(response) {
					   
					  }
					);
    }
});