$( document ).ready(function(){
	$('#ddlDestination').change(function () {
	    sessionStorage.SelectedDestination = $('#ddlDestination option:selected').attr('value');
	    window.location.href = "ListView.html";
	});
});