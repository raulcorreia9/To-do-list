const express = require('express');
const router = express.Router();
const Checklist = require('../models/checklist')

//Find All
router.get('/', async (req, res) => {
    try {
        let checkLists = await Checklist.find({});
        res.status(200).render('checklists/index.ejs', { checklists: checkLists });
    } catch (error) {
        res.status(400).render('checklists/error.ejs', { error: error });
    }
})

//Find by Id
router.get('/:id', async (req, res) => {
    try {
        let checkList = await Checklist.findById(req.params.id)
        res.status(200).render('checklists/show.ejs', { checklist: checkList });
    } catch (error) {
        res.status(400).render('checklists/error.ejs', { error: error });
    }
})

//Create
router.post('/', async (req, res) => {
    let { name } = req.body;
    
    try {
        let checkList = await Checklist.create({ name });
        res.status(201).json(checkList);
    } catch(error) {
        res.status(422).json(error);
    }
})

//Update
router.put('/:id', async (req, res) => {
    let { name } = req.body
    
    try {
        let checkList = await Checklist.findByIdAndUpdate(req.params.id, { "name":name }, { new: true })
        res.status(200).json(checkList);
    } catch (error) {
        res.status(400).json(error);
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    try {
        let checkList = await Checklist.findByIdAndRemove(req.params.id)
        res.status(200).json(checkList);
    } catch (error) {
        res.status(400).json(error);
    }
})

module.exports = router;