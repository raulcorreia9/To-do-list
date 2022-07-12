const express = require('express');
const router = express.Router();
const Checklist = require('../models/checklist')

//Find All
router.get('/', async (req, res) => {
    try {
        let checkLists = await Checklist.find({});
        res.status(200).render('checklists/index.ejs', { checklists: checkLists });
    } catch (error) {
        res.status(400).render('pages/error.ejs', { error: error });
    }
})

//Rota para passar informações da checklist a ser criada para o form dinâmico
router.get('/new', async(req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new.ejs', { checklist: checklist })
    } catch (error) {
        res.status(400).render('pages/error.ejs', { error: error })
    }
})

//Create
router.post('/', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({ name })
    try {
        await checklist.save();
        res.status(201).redirect('/checklists');
    } catch(error) {
        res.status(422).render('checklists/new', { checklist: { ...checklist, error }});
    }
})

//Find by Id
router.get('/:id', async (req, res) => {
    try {
        let checkList = await Checklist.findById(req.params.id).populate('tasks');
        res.status(200).render('checklists/show.ejs', { checklist: checkList });
    } catch (error) {
        res.status(400).render('pages/error.ejs', { error: error });
    }
})

//Rota para passar informações da checklist a ser editada para o form dinâmico
router.get('/:id/edit', async (req, res) => {
    try {
        let checkList = await Checklist.findById(req.params.id)
        res.status(200).render('checklists/edit.ejs', { checklist: checkList });
    } catch (error) {
        res.status(400).render('pages/error.ejs', { error: error });
    }
})


//Update
router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist
    let checklist = await Checklist.findById(req.params.id);

    try {
        await checklist.updateOne({ "name":name })
        res.status(201).redirect('/checklists');
    } catch (error) {
        res.status(422).render(`/checklists/${req.params.id}/edit`, { checklist: { ...checklist, error: error }});
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    try {
        await Checklist.findByIdAndRemove(req.params.id)
        res.status(200).redirect('/checklists');
    } catch (error) {
        res.status(400).render('pages/error.ejs', { error: error });
    }
})

module.exports = router;