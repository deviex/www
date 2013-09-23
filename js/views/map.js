app.views.map = Backbone.View.extend({
   
	
    render: function () {
		console.log("Rendering map view");
        this.$el.html(this.template);	
		return this;
    },

	events: {
        "click .go": "go"
    },

    go: function(event) {
			var filteredplaces=[];
    		var key = $('select').val();
			var pricelower=	$('#range-4a').val();
			var priceupper=	$('#range-4b').val();
			if(key!="all")
			{
			for(var i=0;i<globalplaces.length;i++)
			{
				if(globalplaces[i].map_location_categories[0]==key )//&& globalplaces[i].custom_fields["maplist_display_price"][0] > pricelower &&  globalplaces[i].custom_fields["maplist_display_price"][0] < priceupper)
				{
					filteredplaces.push(globalplaces[i]);
					}
				}
			}
			else
			{
				filteredplaces=globalplaces;
				}
			
			var newfiltered = [];
			for(var i=0;i<filteredplaces.length;i++)
			{
				if(parseInt(filteredplaces[i].custom_fields["maplist_display_price"][0]) >= parseInt(pricelower) &&  parseInt(filteredplaces[i].custom_fields["maplist_display_price"][0]) <= parseInt(priceupper))
				{
					newfiltered.push(filteredplaces[i]);
					}
				}
			app.google.places.reset(newfiltered);

    }
	
});