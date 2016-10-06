var meuMercado = {
    countDb: 6,
    db: null,

    init: function () {
        this.db = openDatabase('meu_mercado', '1.0', 'DB trabalho meu mercado', 2 * 1024 * 1024);
        meuMercado.count();
    },

    template: function(){
        meuMercado.criatabela();
        meuMercado.insertExemple();
    },

    count: function(){
        meuMercado.db.transaction(function(tx){
            tx.executeSql(       
                "SELECT * FROM PRODUTOS",
                [],
                function(tx, result){
                    if(result.rows.length==0){
                        meuMercado.template();
                    }
                },
                function(tx, error){
                    console.warn('Deu errado!');
                    console.warn(error);
                }
            );
        }); 
    },

    criatabela: function () {
        meuMercado.db.transaction (function (tx) {
            tx.executeSql ("CREATE TABLE IF NOT EXISTS PRODUTOS (nome TEXT, tipo TEXT, valor DECIMAL, estoque INT )",null,null);
        });
    },

    insert: function (nome, tipo, valor, estoque){
        meuMercado.db.transaction(function(tx){
            tx.executeSql('INSERT INTO PRODUTOS (nome,tipo,valor,estoque) VALUES (?,?,?,?)',
                [nome, tipo, valor, estoque],
                function(tx,result){
                    console.log("Cadastrado com sucesso!");
                    console.log("result",result);
                },function(tx,err){
                    console.warn("err",err);
                    console.warn("Erro ao cadastrar no banco de dados.");
                });
        })
    },

    insertExemple: function (){
        meuMercado.insert('Itaipava', 'Cerveja', 1.50, 200);
        meuMercado.insert('Skol', 'Cerveja', 1.70, 300);
        meuMercado.insert('Del Vale', 'Suco', 2.10, 100);
        meuMercado.insert('Pepsi Cola 2L', 'Refrigerante', 3.00, 800);
        meuMercado.insert('Guaraná Charrua 2L', 'Refrigerante', 2.50, 340);
        meuMercado.insert('Bis branco', 'Chocolate', 2.70, 50);
    }
}

meuMercado.init();