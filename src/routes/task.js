const express = require('express');
const checklistDependentRouter = express.Router();
const simpleRouter = express.Router();

const Checklist = require('../models/checklist')
const Task = require('../models/task');

checklistDependentRouter.get('/:id/tasks/new', async (req, res) => {    
    try {
        let task = new Task();
        res.status(200).render('tasks/new', { checkListId: req.params.id, task: task });
    } catch (error) {
        res.status(400).render('pages/error.ejs', { error: error });
    }
})

checklistDependentRouter.post('/:id/tasks', async (req, res) => {
    let { name } = req.body.task;
    let task = new Task({ name:name, checklist: req.params.id })
    
    try {
        await task.save();
        let checklist = await Checklist.findById(req.params.id);
        //Adiciona task no array de Tasks da checklist correspondente
        checklist.tasks.push(task);
        await checklist.save();
        res.status(201).redirect(`/checklists/${req.params.id}`);
    } catch (error) {
        res.status(422).render(`/${req.params.id}/tasks/new`, { task: { ...task, error: error }, checkListId: req.params.id })
    }
})

simpleRouter.delete('/:id', async(req, res) => {
    try {
        let task = await Task.findByIdAndDelete(req.params.id);
        
        //Pegando a checklist 'mãe' da task a ser removida
        let checklist = await Checklist.findById(task.checklist);
        
        //Removendo task da checklist
        let taskToRemove = checklist.tasks.indexOf(task._id);
        checklist.tasks.splice(taskToRemove, 1);
        checklist.save();
        
        res.status(200).redirect(`/checklists/${checklist._id}`);
    } catch (error) {
        res.status(400).render('pages/error.ejs', { error: error });
    }
})

simpleRouter.put('/:id', async (req, res) => {
    let task = await Task.findById(req.params.id);
    try {
        task.set(req.body.task)
        await task.save();
        res.status(200).json({ task });
    } catch (error) {
        res.status(422).json({ task: { ...error }});
    }
})

module.exports = { checklistDependent: checklistDependentRouter, simple: simpleRouter };