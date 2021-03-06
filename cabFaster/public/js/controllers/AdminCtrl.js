sampleApp.controller('AdminController', function($scope, $http, $filter, AdminCRUDService) {

	$scope.tagline = 'Book your movies here!';

	var collections = ['driv', 'cabr', 'cabt', 'tarf', 'ureg', 'loct', 'cont', 'offr'];

var dataRefresh = function (collections) {
        collections.forEach(function(collection){
                                var promise =  AdminCRUDService.getData(collection);
                                    promise.then(function(data){
                                        $scope[`${collection}List`] = data;
                                        $scope[collection] = "";
                                    })
                             });
    };

    dataRefresh(collections);

$scope.addData = function(model){
    var serviceName = (Object.keys(model)[0]).substring(0,4);
	var promise =  AdminCRUDService.addData(model, serviceName);
    promise.then(function(data){
        dataRefresh([serviceName]);
    })

}

$scope.deleteData= function(model){
    var serviceName = (Object.keys(model)[1]).substring(0,4);
    var promise =  AdminCRUDService.deleteData(model, serviceName);
    promise.then(function(data){
      dataRefresh([serviceName]);
    })
}

$scope.editData = function(model){
    var serviceName = (Object.keys(model)[1]).substring(0,4);
    var promise =  AdminCRUDService.editData(model, serviceName);
    promise.then(function(data){
        $scope[serviceName] = data[0];
    })
}

$scope.updateData = function(model){
    var serviceName = (Object.keys(model)[1]).substring(0,4);
    var promise =  AdminCRUDService.updateData(model, serviceName);
    promise.then(function(data){
        dataRefresh([serviceName]);
    })
}



//user-registration form validation
function validation()
{
	var name 				= document.getElementById('name').value;
	var contact 		= document.getElementById('contact').value;
	var company 		= document.getElementById('company').value;
	var city 				= document.getElementById('city').value;
	var email 			= document.getElementById('email').value;
	var password 		= document.getElementById('password').value;

	var emailreg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;

	if (name!="" && contact!="" && company!="" && city!=""&& email!="" && password!="")
	{
		if (email.match(emailreg))
		{
			if (contact.length==10)
			{
				if (company.length<255)
				{
					if (password.length >= 4 && password <= 8) {
						alert("Do you want to proceed.");
						return true;
					}
					else {
						alert("Enter Password between 4 to 8 characters only.");
						return false;
					}
				}
				else {
					alert("Enter company name upto 255 characters.");
					return false;
				}
			}
			else {
				alert("Enter Contact number of 10 Digits.");
				return false;
			}
		}
		else {
			alert("Enter Valid Email-ID");
			return false;
		}
	}
	else
	{
		alert("All Fields are equired...");
		return false;
	}
}


 $(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });
});


/*
// // Show timings
 $scope.example13model = [];
        $scope.example13data = [
            {id: 7, label: "David"},
            {id: 2, label: "Jhon"},
            {id: 3, label: "Lisa"},
            {id: 4, label: "Nicole"},
            {id: 5, label: "Danny"}];

        $scope.example13settings = {
            smartButtonMaxItems: 2,
            smartButtonTextConverter: function(itemText, originalItem) {
                if (itemText === 'Jhon') {
                return 'Jhonny!';
                }

                return itemText;
            }
        };


// movie insert
$scope.insertMovie=function(movi){
                $http.get(`http://www.omdbapi.com/?t=${movi.moviTitle}&plot=short&r=json`).success(function (response) {
                            //console.log(response);
                            var movieObj={};
                            for(var key in response){
                                if(key=='Title' || key== 'Language' || key== 'Poster' || key== 'Genre' || key== 'Director' || key== 'Actors'){
                                    movieObj[key] = response[key];

                                }
                            }

                           var serviceName = 'movi'
                            var promise =  AdminCRUDService.addData(movieObj, serviceName);
                            promise.then(function(data){
                                dataRefresh([serviceName]);
                            })
                        });

}

// load theatres based on city

    $scope.loadTheatres = function(){
       $scope.cityTheatres = [];
       for(var theatre of $scope.thtrList){
            if(theatre.city == $scope.asmv.asmvCity){
                $scope.cityTheatres.push(theatre)
            }
       }

    }

 //constructAssignMovieModel
    $scope.addAssignMovie = function(model){
       // var fromDate =  $filter('date')(model.asmvFromDate, 'shortDate');
       // var toDate = $filter('date')(model.asmvToDate, 'shortDate');

       var fromDate = moment(model.asmvFromDate).format('l');
       var toDate = moment(model.asmvToDate).format('l');

        model.asmvFromDate = fromDate;
        model.asmvToDate = toDate;
        $scope.addData(model);
    }
*/
});
