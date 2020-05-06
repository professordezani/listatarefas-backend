const express = require('express');
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'galnhjufhoujkn',
    password: '627aa7c1a4ca013797436c82eb2b7f3b61f72ee277bdf56d141bcfe657914389',
    host: 'ec2-34-234-228-127.compute-1.amazonaws.com',
    database: 'd4pmpu713okcpc',
    port: 5432,
    ssl:  { rejectUnauthorized: false }
});

const server = express();

server.use(express.json());

server.get('/tarefa', async function(request, response) {
    const result = await pool.query('SELECT * FROM tarefas');
    return response.json(result.rows);
})

server.post('/tarefa', async function(request, response) {
    const name = request.body.name; // JSON
    const sql = `INSERT INTO tarefas (name, done) VALUES ($1, $2)`;
    await pool.query(sql, [name, false]);
    return response.status(204).send(); 
})

// TODO: Fazer o put (update) e o delete (delete).

// escutar um porta com as requisições HTTP:
server.listen(process.env.PORT || 3000);
