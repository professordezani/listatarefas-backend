const express = require('express');
const Pool = require('pg').Pool;
const cors = require('cors');

const pool = new Pool({
    user: 'galnhjufhoujkn',
    password: '627aa7c1a4ca013797436c82eb2b7f3b61f72ee277bdf56d141bcfe657914389',
    host: 'ec2-34-234-228-127.compute-1.amazonaws.com',
    database: 'd4pmpu713okcpc',
    port: 5432,
    ssl:  { rejectUnauthorized: false }
});

const server = express();

server.use(cors());

server.use(express.json());

server.get('/tarefa', async function(request, response) {
    const result = await pool.query('SELECT * FROM tarefas');
    return response.json(result.rows);
})

// request.params.id -> /tarefa/:id
// request.body -> corpo da mensagem
// request.query.name -> /tarefa/?name=abc

server.get('/tarefa/search', async function(request, response) {
    const name = request.query.name;
    const sql = `SELECT * FROM tarefas WHERE name ILIKE $1`;
    const result = await pool.query(sql, ["%" +  name + "%"]);
    return response.json(result.rows);
})

server.get('/tarefa/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `SELECT * FROM tarefas WHERE id = $1`
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
})

server.post('/tarefa', async function(request, response) {
    const name = request.body.name; // JSON
    // SQL Injection
    // const sql = `INSERT INTO tarefas (name, done) VALUES (`+ name + `, false)`;
    const sql = `INSERT INTO tarefas (name, done) VALUES ($1, $2)`;
    await pool.query(sql, [name, false]);
    return response.status(204).send(); 
})

server.delete('/tarefa/:id', async function(request, response) { 
    const id = request.params.id;
    const sql = `DELETE FROM tarefas WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

server.put('/tarefa/:id', async function(request, response) {
    const id = request.params.id;
    const { name, done } = request.body;
    const sql = `UPDATE tarefas SET name = $1, done = $2 WHERE id = $3`;
    await pool.query(sql, [name, done, id]);
    return response.status(204).send();
})

server.patch('/tarefa/:id/done', async function(request, response) {
    const id = request.params.id;
    const sql = `UPDATE tarefas SET done = true WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

server.patch('/tarefa/:id/undone', async function(request, response) {
    const id = request.params.id;
    const sql = `UPDATE tarefas SET done = false WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

// escutar um porta com as requisições HTTP:
server.listen(process.env.PORT || 3000);
