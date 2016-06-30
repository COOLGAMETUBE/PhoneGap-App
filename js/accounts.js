var useraccount = {
	id: 1,
	firstname: "Simon",
	lastname: "Nitzsche",
	idd: "LGVC148139",
	token: ""
};

var accounts = {

	init: function() {
		this.generateToken(useraccount.firstname, useraccount.lastname, useraccount.idd, function(){});
	},

	generateToken: function(firstname, lastname, idd, callback){
		var urli = properties.ServiceAPI+"?action=createToken";
		    urli+= "&firstname="+encodeURIComponent(firstname);
		    urli+= "&lastname="+encodeURIComponent(lastname);
		    urli+= "&idd="+encodeURIComponent(idd);
		$.ajax({
		    url : urli,
		    success : function(result){
		        var F=new Function (result);
		        F();
		        callback();
		    }
		});
	}

};
