'use strict';

angular
	.module("app")
	.controller("baseCtrl",baseCtrl);

baseCtrl.$inject = ['$scope','$http', '$q','$timeout'];

function baseCtrl($scope, $http, $q, $timeout){
	/*variaveis*/
	var vm = this;
	vm.produtos=[];
	vm.fields={};
	vm.novoProduto={};

	/*ações*/
	vm.listarProduto = listarProduto;
	vm.cadastrarProduto = cadastrarProduto;
	vm.excluirProduto = excluirProduto;
	vm.alterarProduto = alterarProduto;

	/*funções*/

	function listarProduto(){

		if(
			(vm.fields.nome==undefined&&vm.fields.tipo==undefined)
			|| (vm.fields.nome==""&&vm.fields.tipo=="")
		){
			meuMercado.db.transaction(function(tx){
				tx.executeSql(
					"SELECT * FROM PRODUTOS",
					[],
					function(tx, result){
						$timeout(function(){
							angular.copy(result.rows,vm.produtos);
						},10);
					},
					function(tx, error){
						console.log('Deu errado!');
						console.log(error);
					}
				);
			});
		}else{
			meuMercado.db.transaction(function(tx){
				tx.executeSql(
					"SELECT * FROM PRODUTOS WHERE nome = ? OR tipo = ?",
					[vm.fields.nome,vm.fields.tipo],
					function(tx, result){
						$timeout(function(){
							angular.copy(result.rows,vm.produtos);
						},10);
					},
					function(tx, error){
						console.log('Deu errado!');
						console.log(error);
					}
				);
			});
		}
	}
	function cadastrarProduto(){
			meuMercado.db.transaction(function(tx){
				tx.executeSql('INSERT INTO PRODUTOS (nome,tipo,valor,estoque) VALUES (?,?,?,?)',
				[vm.novoProduto.nome, vm.novoProduto.tipo, vm.novoProduto.valor, vm.novoProduto.estoque],
				function(tx,result){
					console.log("Cadastrado com sucesso!");
					new PNotify({
						title: 'Sucesso!',
						text: 'Produto cadastrado com sucesso!',
						type: 'success',
						styling: 'bootstrap3'
					});
					$timeout(function() {vm.novoProduto={}}, 10);
				},function(tx,err){
					console.warn("err",err);
					console.warn("Erro ao cadastrar no banco de dados.");
				});
			});
	}
	function excluirProduto(){}
	function alterarProduto(){}

	listarProduto();
}