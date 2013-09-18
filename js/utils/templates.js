app.utils.templates = (function() {
	console.log("Enter templates");

    var load = function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (app.views[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    app.views[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });
		console.log("Calling Back");
        $.when.apply(null, deferreds).done(callback);
    }

    // The public API
    return {
        load: load
    };

}());