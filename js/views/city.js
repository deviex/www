app.views.cities = Backbone.View.extend({
    render: function () {
        this.$el.html(this.template());
        return this;
    },
	
	events: {
		"click .select-button": "go"
    },

    go: function(event) {
    		alert('here');
    		console.log("Testing");
    		//alert($('select').val());
    		var key = $('select').val();
    		alert(key);
			app.router.navigate('gmap/'+ key +'',{trigger: true});
    }
});