const express = require('express');

//Routes
const checkListRouter = require('./src/routes/checklist')
const taskRouter = require('./src/routes/task')
const indexRouter = require('./src/routes/index');

const path = require('path')
const methodOverride = require('method-override');

//Executa o arquivo database.js assim que o app.js rodar
require('./config/database');

const app = express();
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

//middleware para leitura de json
app.use(express.json());
//middleware para leitura de dados vindos de um formulário
app.use(express.urlencoded({ extended: true }));
//middlware para usar arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride('_method', { methods: ['POST', 'GET']}));

app.use('/checklists', checkListRouter);
app.use('/', indexRouter);
//Rotas da Task que dependem do checklist ID
app.use('/checklists', taskRouter.checklistDependent);
//Rota da Task que não depede do checklist ID
app.use('/tasks', taskRouter.simple);

// app.get('/', (req, res) => {
//     res.send('<h1>Opa! :)</h1>')
// })

app.listen(3000, () => {
    console.log('Rodando na porta 3000!');
})