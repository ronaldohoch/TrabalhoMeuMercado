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
	vm.pin;
	vm.produtoParaEditar;

	/*ações*/
	vm.listarProduto = listarProduto;
	vm.cadastrarProduto = cadastrarProduto;
	vm.verificaPin = verificaPin;
	vm.salvarEdicao = salvarEdicao;

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
	function verificaPin(id,action){
		var pin = prompt("Digite o pin para proceguir","1234");
		if(pin==1234){
			switch(action){
				case 1:
					excluirProduto(id);
				break;
				case 2:
					cadastrarProduto();
				break;
				case 3:
					vm.produtoParaEditar = angular.copy(id);
					// vm.produtoParaEditar=id
					//coisa feia
					$(".edit-modal").click();
				break;
				default:

				break;
			}
		}else{
			if(pin!=null)
				new PNotify({
					title: 'Sucesso!',
					text: 'Pin inválido.',
					type: 'error',
					styling: 'bootstrap3'
				});
		}
	}
	function excluirProduto(id){
		if(window.confirm("Deseja realmente excluir?")){
			meuMercado.db.transaction(function(tx){
				tx.executeSql("DELETE FROM PRODUTOS WHERE id = ?",
					[id],
					function(tx,result){
						new PNotify({
							title: 'Sucesso!',
							text: 'Produto excluído com sucesso!',
							type: 'success',
							styling: 'bootstrap3'
						});
						listarProduto();
					},
					function(tx,err){
						new PNotify({
							title: 'Erro!',
							text: 'Não foi possível excluir o produto.',
							type: 'error',
							styling: 'bootstrap3'
						});
						console.log(err);
					});
			})
		}
	}
	function salvarEdicao(){
		// vm.produtoParaEditar

		meuMercado.db.transaction(function(tx){
			tx.executeSql('UPDATE PRODUTOS SET nome=?,tipo=?,valor=?,estoque=? WHERE id = ?',
			[vm.produtoParaEditar.nome, vm.produtoParaEditar.tipo, vm.produtoParaEditar.valor, vm.produtoParaEditar.estoque, vm.produtoParaEditar.id],
			function(tx,result){
				new PNotify({
					title: 'Sucesso!',
					text: 'Produto atualizado com sucesso!',
					type: 'success',
					styling: 'bootstrap3'
				});
				listarProduto();
			},function(tx,err){
				console.warn("err",err);
				new PNotify({
					title: 'Sucesso!',
					text: 'Erro ao atualizar.',
					type: 'error',
					styling: 'bootstrap3'
				});
			});
		});
	}

	listarProduto();

	//Feiosos
}