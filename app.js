const express = require('express');
const checkListRouter = require('./src/routes/checklist')
//Executa o arquivo database.js assim que o app.js rodar
require('./config/database');

const app = express();

//middleware para leitura de json
app.use(express.json());
app.use('/checklist', checkListRouter);

app.get('/', (req, res) => {
    res.send('<h1>Opa! :)</h1>')
})

app.listen(3000, () => {
    console.log('Rodando na porta 3000!');
})