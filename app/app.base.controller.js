'use strict';

angular
	.module("app")
	.controller("baseCtrl",baseCtrl);

baseCtrl.$inject = ['$scope','$http'];

function baseCtrl($scope, $http){
	/*variaveis*/
	var vm = this;
	vm.active = true;

	/*ações*/
	vm.listarProduto = listarProduto;
	vm.buscarProduto = buscarProduto;
	vm.cadastrarProduto = cadastrarProduto;
	vm.excluirProduto = excluirProduto;
	vm.alterarProduto = alterarProduto;

	/*funções*/
	function listarProduto(){}
	function buscarProduto(){}
	function cadastrarProduto(){}
	function excluirProduto(){}
	function alterarProduto(){}
}