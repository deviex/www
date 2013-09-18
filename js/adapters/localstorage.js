app.adapters.employee = (function () {

    var findById = function (id) {
            var deferred = $.Deferred();
            var employee = null;
            var l = employees.length;
            for (var i = 0; i < l; i++) {
                if (employees[i].id === id) {
                    employee = employees[i];
                    break;
                }
            }
            deferred.resolve(employee);
            return deferred.promise();
        }

        employees = [
			{"id" : "1", "ExperienceName" : "Paragliding" , "Price" : "2500" , "Rating" : "****1/2" , "Location" : "Himachal"},
			{"id" : "2", "ExperienceName" : "Trekking" , "Price" : "3000" , "Rating" : "****" , "Location" : "Mc Leodganj"},
			{"id" : "3", "ExperienceName" : "Skydiving" , "Price" : "20000" , "Rating" : "*****" , "Location" : "Madhya Pradesh"},
			{"id" : "4", "ExperienceName" : "Rafting" , "Price" : "1500" , "Rating" : "***1/2" , "Location" : "Rishikesh"},
			{"id" : "5", "ExperienceName" : "David Harley" , "Price" : "13000" , "Rating" : "***" , "Location" : "Delhi"},
			{"id" : "6", "ExperienceName" : "Ice Skating" , "Price" : "700" , "Rating" : "***1/2" , "Location" : "Gurgaon"},
			{"id" : "7", "ExperienceName" : "Water Blob" , "Price" : "500" , "Rating" : "***" , "Location" : "Sohna Road"}
			]

    // The public API
    return {
        findById: findById
    };

}());