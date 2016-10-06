angular
	.module("app",["ngRoute"])
	.config(function($routeProvider, $locationProvider){
		// $locationProvider.html5Mode(true);
		
		$routeProvider
			.when("/listagem",{
				templateUrl:"views/listagem.html",
				activetab:"listagem"
			})
			.when("/cadastrar",{
				templateUrl:"views/cadastrar.html",
				activetab:"cadastrar"
			})
			.otherwise({redirectTo:"/listagem"});
	}).run(function($rootScope,$route){
		$rootScope.$route = $route;
	});