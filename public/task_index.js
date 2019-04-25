var ListeaFaire = angular.module('ListeaFaire', []);

function mainController($scope,$http,$window){

	var p = sessionStorage.getItem("pseudo");
	var groupe = sessionStorage.getItem("groupe");
	$scope.formData = {};
	$scope.form = {};
	sessionStorage.setItem("pseudo",null);
	sessionStorage.setItem("groupe",null);

	/*$http.get('/getTaskSet/' + p)
		.success(function(data){
			$scope.laliste = data;
			console.log(data);
		})

		.error(function(data){
			console.log('Error: ' + data);
		});

	$http.get('/getAllGroup/' + p)
		.success(function(data){
			$scope.groupe = data;
			console.log(data);
		})

		.error(function(data){
			console.log('Error: ' + data);
		});*/

	$http.get('/getTaskGrouped/' + p + "/" + groupe)
		.success(function(data){
			$scope.laliste = data ;
			console.log(data);
		})
		
		.error(function(data){
			console.log('Error: ' + data);
		});

	$http.get('/getAllGroup/' + p)
		.success(function(data){
			$scope.groupe = data;
			console.log(data);
		})

		.error(function(data){
			console.log('Error: ' + data);
		});

	$scope.createTodo = function(){
		$http.post('/addTask/' + p + "/" + groupe, $scope.form)
			.success(function(data) {
				$scope.form = {};
				$scope.laliste = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	$scope.deleteTodo = function(id){
		$http.delete('/deleteTask/' + p + "/"  + groupe + "/" + id)
			.success(function(data){
				$scope.laliste = data ;
				console.log(data);
			})
			
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	$scope.checkTask = function(id){
		$http.put('/updateTaskDone/' + p + "/"  + groupe + "/" + id)
			.success(function(data){
				$scope.laliste = data ;
				console.log(data);
			})
			
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	$scope.modifyTask = function(id){
		$http.put('/updateTaskName/' + p + "/"  + groupe + "/" + id, $scope.formData)
			.success(function(data){
				$scope.laliste = data ;
				console.log(data);
				$scope.formData = {};
			})
			
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	$scope.logout = function () {
		sessionStorage.setItem("pseudo", null);
		var u = "http://" + $window.location.host + "/";
		$window.location.href = u;
	};

	$scope.backGroups = function () {
		var u = "http://" + $window.location.host + "/groups";
		$window.location.href = u;
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

function check() {
	var btn = document.getElementById("btncheck");
	if (btn.innerHTML == "A Faire") {
		btn.innerHTML = "Fait";
	}
	else {
		btn.innerHTML = "A Faire";
	}
};