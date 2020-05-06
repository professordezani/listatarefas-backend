// yarn add pg

const Pool = require('pg').Pool;

// 1 - Abrir a conexão
// 2 - Executar o comando SQL (query, insert) 30ms (índice)
// 3 - Fechar a conexão

const pool = new Pool({
    user: 'galnhjufhoujkn',
    password: '627aa7c1a4ca013797436c82eb2b7f3b61f72ee277bdf56d141bcfe657914389',
    host: 'ec2-34-234-228-127.compute-1.amazonaws.com',
    database: 'd4pmpu713okcpc',
    port: 5432,
    ssl:  { rejectUnauthorized: false }
});

// const sql = `
//     CREATE TABLE IF NOT EXISTS tarefas
//     (
//         ID serial primary key,
//         name varchar(200) not null,
//         done boolean
//     )
// `;

// pool.query(sql, function(error, result) {
//     if(error) 
//         throw error
    
//     console.log('Tabela criada com sucesso!');
// })


// INSERT
const sql_insert = `
        INSERT INTO tarefas (name, done) 
            VALUES ('Assistir La Casa de Papel', true)
`;

pool.query(sql_insert, function(error, result) {
    if(error)
        throw error;

    console.log(result.rowCount);
})

// SELECT

// const sql_select = `SELECT * FROM tarefas`;

// pool.query(sql_select, function(error, result) { 
//     if(error)
//         throw error;

//     console.log(result.rows);
// })