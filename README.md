# TrabalhoMeuMercado
#### Software MeuMercado (requisitos).
----------


Um cliente deseja um software para seu supermercado. Tal software deve possuir as
seguintes funcionalidades:

* F001: Listar produtos
* F002: Busca de produtos (nome)
* F003: Busca de produtos (tipo)
* F004: Cadastrar produtos
* F005: Excluir produto
* F006: Alterar valor de produto
* F007: Alterar estoque de produto

O dono do mercado deseja que as operações de cadastro, exclusão e alteração de produtos
só possam ser efetuadas por ele, desta forma ele deseja que o software possua uma senha de
proteção, solicitada sempre que se efetue tais funcionalidades, ou um usuário administrador com
tais privilégios.

----------

Quando indagado sobre as informações que cada produto deve possuir ele informou que
para realizar seus controles administrativos todo produto precisa de um código, valor de venda
e quantidade em estoque. Ele também pediu que o nome do produto e seu tipo fossem incluídos
no cadastro, listando alguns exemplos:

CÓDIGO | NOME | TIPO | VALOR | ESTOQUE
--- | --- | --- | --- | --- |
000 | Itaipava | Cerveja | 1,50 | 200
001 | Skol | Cerveja | 1,70 | 300
002 | Del Vale | Suco | 2,10 | 100
003 | Pepsi Cola 2L | Refrigerante | 3,00 | 800
004 | Guaraná Charrua 2L | Refrigerante | 2,50 | 340
005 | Bis branco | Chocolate | 2,70 | 50 

----------

Bugs propositais para a aula:

* Não valida campos.
* Pesquisa com 2 campos só retora o valor de 1