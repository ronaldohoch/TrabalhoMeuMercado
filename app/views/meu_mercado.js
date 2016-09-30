var meuMercado = {
    countDb: 6,
    db: null,
    data : [
        {id:1, nome:'Itaipava', tipo: 'Cerveja', valor:1.50,estoque: 200},
        {id:2, nome:'Skol', tipo:'Cerveja', valor: 1.70, estoque: 300},
        {id:3, nome:'Del Vale',tipo: 'Suco', valor: 2.10, estoque: 100},
        {id:4, nome:'Pepsi Cola 2L',tipo: 'Refrigerante', valor: 3.00, estoque: 800},
        {id:5, nome:'Guaraná Charrua 2L',tipo: 'Refrigerante',valor: 2.50, estoque: 340},
        {id:6, nome:'Bis branco', tipo:'Chocolate', valor: 2.70, estoque: 50},
    ],

    init: function () {
        this.db = openDatabase ('meu_mercado', '1.0', 'DB trabalho meu mercado', 2 * 1024 * 1024);

        if(!meuMercado.count() > 0) {
            meuMercado.template();
        }
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

                    var len = result.rows.length;

                    return len;

                },

                function(tx, error){
                    console.log('Deu errado!');
                    console.log(error);
                }
            );
        }); 
    },

    criatabela: function () {
        meuMercado.db.transaction (function (tx) {
            tx.executeSql ("CREATE TABLE IF NOT EXISTS PRODUTOS (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, nome TEXT, tipo TEXT, valor DECIMAL, estoque INT )",null,null);
        });
    },

    insert: function (nome, tipo, valor, estoque){

        meuMercado.countDb++;

        meuMercado.data.push(
            {id: meuMercado.countDb, nome:nome, tipo: tipo, valor: valor, estoque: estoque});

        // meuMercado.db.transaction (function (tx) {
        //     tx.executeSql ("INSERT INTO PRODUTOS (nome, tipo, valor, estoque) VALUES (?,?,?,?)",[ nome, tipo, valor, estoque],null,null);
        // });
    },

    edit: function (){

    },

    listar: function (){
        return meuMercado.data;
    },


    retrive: function (){
        meuMercado.db.transaction (function (tx) {
            tx.executeSql ("SELECT * FROM PRODUTOS",null,null);
        });
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