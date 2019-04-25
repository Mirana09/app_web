var ListeaFaire = angular.module('ListeaFaire', []);

function mainController($scope,$http,$window){

	var p = sessionStorage.getItem("pseudo");
	var groupe = sessionStorage.getItem("groupe");
	$scope.form = {};
	
	$http.get('/getAllGroup/' + p)
		.success(function(data){
			$scope.groupe = data;
			console.log(data);
		})

		.error(function(data){
			console.log('Error: ' + data);
		});

	$scope.createGroup = function(){
		$http.post('/addGroup/' + p, $scope.form)
			.success(function(data) {
				$scope.form = {};
				$scope.groupe = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	$scope.setGroup = function(id){
		$http.get('/getGroup/' + id)
			.success(function(data){
				sessionStorage.setItem("groupe", data.name);
        		var u = "http://" + $window.location.host + "/tasks";
        		$window.location.href = u;
			})
			
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	$scope.logout = function () {
		sessionStorage.setItem("pseudo", null);
		sessionStorage.setItem("groupe", null);
		var u = "http://" + $window.location.host + "/";
		$window.location.href = u;
	};

	$scope.deleteGroup = function(id,nom){
		$http.delete('/deleteGroup/' + p + "/"  + nom + "/" + id)
			.success(function(data){
				$scope.groupe = data ;
				console.log(data);
				//var u = "http://" + $window.location.host + "/groups";
				//$window.location.href = u;
			})
			
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

};

function showTextBox(id) {
	var vu = document.getElementById(id);
	if (vu.style.visibility == "hidden") vu.style.visibility = "visible";	
};

function hideTextBox(id) {
	var vu = document.getElementById(id);
	if (vu.style.visibility == "visible") vu.style.visibility = "hidden";	
};
