const express = require('express');
const checkListRouter = require('./src/routes/checklist')
const indexRouter = require('./src/routes/index')
const path = require('path')
//Executa o arquivo database.js assim que o app.js rodar
require('./config/database');

const app = express();
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

//middleware para leitura de json
app.use(express.json());
//middlware para usar arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/checklist', checkListRouter);
app.use('/', indexRouter);

app.get('/', (req, res) => {
    res.send('<h1>Opa! :)</h1>')
})

app.listen(3000, () => {
    console.log('Rodando na porta 3000!');
})