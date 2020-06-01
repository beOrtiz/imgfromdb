const fs = require('fs')
const sql = require("mssql");

var config = {
    user: '',
    password: '',
    server: '',
    database: '',
};

sql.connect(config, function(err) {
    if (err) console.log(err);

    let sqlRequest = new sql.Request();

    let sqlQuery = 'Select * from tb_teste';
    sqlRequest.query(sqlQuery, function(err, data) {
        if (err) console.log(err);

        const buffer = data.recordset[0].nomeDaColunaComAImagem;

        data.recordset.forEach(element => {
            fs.writeFileSync(`./imagens/${'NomeDoArquivo'}.pdf`, element.nomeDaColunaComAImagem);
        })
        sql.close();
    });
});