'use strict';

angular
	.module("app")
	.controller("baseCtrl",baseCtrl);

baseCtrl.$inject = ['$scope','$http', '$q'];

function baseCtrl($scope, $http, $q){
	/*variaveis*/
	var vm = this;
	vm.active = true;

	vm.fields={
		tipoProduto:"",
		nomeProduto:""
	};

	vm.produtos = [];

	/*ações*/
	vm.listarProduto = listarProduto;
	vm.buscarProduto = buscarProduto;
	vm.cadastrarProduto = cadastrarProduto;
	vm.excluirProduto = excluirProduto;
	vm.alterarProduto = alterarProduto;

	/*funções*/
	meuMercado.init();

	function listarProduto(){
		vm.produtos = meuMercado.listar();
	}
	function buscarProduto(){}
	function cadastrarProduto(){

		 meuMercado.insert(vm.fields.nomeProduto,vm.fields.tipoProduto);
		 // meuMercado.insert(nome, tipo, valor, estoque)

	}
	function excluirProduto(){}
	function alterarProduto(){}

	listarProduto();
}