var ListeaFaire = angular.module('ListeaFaire', []);

function mainController($scope,$http,$window){

	$scope.formData = {};
	$scope.form = {};
	$http.get('/getUserSet')
		.success(function(data){
			$scope.laliste = data;
			console.log(data);
		})

		.error(function(data){
			console.log('Error: ' + data);
		});

	$scope.register = function(){
		$http.post('/createUser', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.laliste = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	$scope.login = function(){
		$http.post('/login', $scope.form)
			.success(function(data) {
				$scope.form = {};
				$scope.laliste = data;
				console.log(data);
				sessionStorage.setItem("pseudo", data.pseudo);
				var p = sessionStorage.getItem("pseudo");
				var u = "http://" + $window.location.host + "/groups";
				var uu = "http://" + $window.location.host + "/erreur_login";
				if (p != 'undefined') $window.location.href = u;
				else $window.location.href = uu;
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	$scope.load_user = function () {
        $scope.pseudo = localStorage.getItem("pseudo");
	};

	$scope.load_user();
}

