	app.google.Location = Backbone.GoogleMaps.Location.extend({
		initialize : function(){
	}
		
	});
	
	app.google.LocationCollection = Backbone.GoogleMaps.LocationCollection.extend({
		model: app.google.Location,
		initialize : function(){
	}
	});
	
	app.google.InfoWindow = Backbone.GoogleMaps.InfoWindow.extend({
		template: '#infoWindow-template',
		
		events: {
			'mouseenter h2': 'logTest'
		},
		
		logTest: function() {
			console.log('test in InfoWindow');
		}
	});
	
	app.google.MarkerView = Backbone.GoogleMaps.MarkerView.extend({
		infoWindow: app.google.InfoWindow,
		
		overlayOptions: {
			draggable: true
		},
		
		initialize: function() {
			_.bindAll(this, 'handleDragEnd');
		},
		
		mapEvents: {
			'dragend'	: 'handleDragEnd'
		},
		
		handleDragEnd: function(e) {
			alert('Dropped at: \n Lat: ' + e.latLng.lat() + '\n lng: ' + e.latLng.lng());
		}
	});
	
	app.google.MarkerCollectionView = Backbone.GoogleMaps.MarkerCollectionView.extend({
		markerView: app.google.MarkerView
	});
	
	
	
	app.google.init = function(markers) {
	//	alert(markers[0].title);
		console.log("before calling createmap");
		for(var i=0;i<markers.length;i++)
		{
			markers[i].lat = markers[i].custom_fields['maplist_latitude'][0];
			markers[i].lng = markers[i].custom_fields['maplist_longitude'][0];
		}
		var self=this;
		$( document ).bind( "pageshow", function( event, data ){
			google.maps.event.trigger(self.map, 'resize');
			});
		this.createMap(markers[0]);			
		this.places = new this.LocationCollection(markers);
		
		// Render Markers
		var markerCollectionView = new this.MarkerCollectionView({
			collection: this.places,
			map: this.map
		});
		console.log("rendering markercollectionview");
		markerCollectionView.render();
		
		// Render ListView
		var listView = new app.google.ListView({
			collection: this.places
		});
		listView.render();
		
			
	}

	app.google.createMap = function(mark) {
		var mapOptions = {
			center: new google.maps.LatLng(mark.lat, mark.lng),
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}				
		// Instantiate map		
		
		this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		
		google.maps.event.trigger(this.map, 'resize');
	}
	
	app.google.ItemView = Backbone.View.extend({
		template: '<%=title %>',
		tagName: 'li',
		
		events: {
			'mouseenter':	'selectItem',
			'mouseleave':	'deselectItem'
		},
		
		initialize: function() {
			_.bindAll(this, 'render', 'selectItem', 'deselectItem')
			
			this.model.on("remove", this.close, this);
		},
		
		render: function() {
			var html = _.template(this.template, this.model.toJSON());
			this.$el.html(html);
			
			return this;
		},
		
		close: function() {
			this.$el.remove();
		},
		
		selectItem: function() {
			this.model.select();
		},
		
		deselectItem: function() {
			this.model.deselect();
		}
	});
	
	app.google.ListView = Backbone.View.extend({
		tagName: 'ul',
		className: 'overlay',
		id: 'listing',
		
		initialize: function() {
			_.bindAll(this, "refresh", "addChild");
			
			this.collection.on("reset", this.refresh, this);
			this.collection.on("add", this.addChild, this);
			
			this.$el.appendTo('body');
		},
		
		render: function() {
			this.collection.each(this.addChild);
		},
		
		addChild: function(childModel) {
			var childView = new app.google.ItemView({ model: childModel });
			childView.render().$el.appendTo(this.$el);
		},
		
		refresh: function() {
			this.$el.empty();
			this.render();
		}
	});
	
	
	