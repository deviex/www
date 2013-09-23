app.views.cities = Backbone.View.extend({
   

    render: function () {
        this.$el.html(this.template());
        return this;
    },
	
	events: {
        "click .go": "go"
    },

    go: function(event) {
    		var key = $('select').val();
			app.router.navigate('gmap/'+ key +'',{trigger: true});
    }
	
});