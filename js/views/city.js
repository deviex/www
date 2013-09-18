app.views.cities = Backbone.View.extend({
    render: function () {
        this.$el.html(this.template());
        return this;
    },
	
	events: {
		"onclick .go": "go"
    },

    go: function(event) {
    		debugger;
    		alert($('select').val());
    		var key = $('select').val();
    		alert(key);
			app.router.navigate('gmap/'+ key +'',{trigger: true});
    }
});