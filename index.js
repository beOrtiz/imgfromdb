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

    let sqlQuery = 'Select * from tb_man_manual';
    sqlRequest.query(sqlQuery, function(err, data) {
        if (err) console.log(err);

        const buffer = data.recordset[0].man_img_manual;

        data.recordset.forEach(element => {
            // if (element.man_idt_manual_pai == undefined || !element.man_idt_manual_pai) {
            //     element.man_idt_manual_pai = 0
            // }
            fs.writeFileSync(`./imagens/${element.man_idt_manual}_${element.man_idt_manual_pai}_${element.man_nom_manual}.pdf`, element.man_img_manual);
        })

        sql.close();
    });
});