angular
	.module("app",["ngRoute"])
	.config(function($routeProvider, $locationProvider){
		// $locationProvider.html5Mode(true);

		$routeProvider
			.when("/listagem",{
				templateUrl:"views/listagem.html"
			})
			.when("/cadastrar",{
				templateUrl:"views/cadastrar.html"
			})
			.otherwise({redirectTo:"/listagem"});
	});