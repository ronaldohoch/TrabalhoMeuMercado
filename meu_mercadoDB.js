var meuMercado = {
    db: null,

    init: function () {
        this.db = openDatabase ('meu_mercado', '1.0', 'DB trabalho meu mercado', 2 * 1024 * 1024);
        meuMercado.insertExemple();

        meuMercado.mostraTeste();
    },

    criatabela: function () {
        meuMercado.db.transaction (function (tx) {
            tx.executeSql ("CREATE TABLE IF NOT EXISTS PRODUTOS (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome TEXT, tipo TEXT, valor DECIMAL, estoque INT )",null,null);
        });
    },

    insert: function (nome, tipo, valor, estoque){
        meuMercado.db.transaction (function (tx) {
            tx.executeSql ("INSERT INTO PRODUTOS (nome, tipo, valor, estoque) VALUES (?,?,?,?)",[ nome, tipo, valor, estoque],null,null);
        });
    },

    edit: function (){

    },

    retrive: function (){

    },

    delete: function (){

    },

    insertExemple: function (){
        meuMercado.insert('Itaipava', 'Cerveja', 1.50, 200);
        meuMercado.insert('Skol', 'Cerveja', 1.70, 300);
        meuMercado.insert('Del Vale', 'Suco', 2.10, 100);
        meuMercado.insert('Pepsi Cola 2L', 'Refrigerante', 3.00, 800);
        meuMercado.insert('Guaraná Charrua 2L', 'Refrigerante', 2.50, 340);
        meuMercado.insert('Bis branco', 'Chocolate', 2.70, 50);
    },

    mostraTeste: function (){
        meuMercado.db.transaction(function(tx){
            tx.executeSql(       
                "SELECT * FROM PRODUTOS",
                [],
                function(tx, result){
                    console.log('Deu certo!');
                    var len = result.rows.length, i;
                    for(i=0;i<len;i++){
                        console.log( result.rows.item(i) );

                        $("#produtos").append("<div>" + result.rows.item(i).estoque + "</div>");
                
                    }

                },

                function(tx, error){
                    console.log('Deu errado!');
                    console.log(error);
                }
            );
        }); 
    },      
}

meuMercado.init();