var express = require('express');
var router = express.Router();
var { texto, insertCollaborator, getAllCollaborator, getCollaboratorById, deleteCollaboratorById, updateCollaboratorById } = require('../controller/collaboratorController');

// insert
router.post('/', async (req, res) => {
    const data = req.body;
    insertCollaborator(data, (err, result, fields) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send({ result, fields });
    });
});

//get all
router.get('/', (req, res) => {
    getAllCollaborator((err, result, fields) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send({ result });
    });
});

//get by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    getCollaboratorById(id, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send({result});
    });
});

//delete by id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    deleteCollaboratorById(id, (err, result) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send(result);
    });
});

// update by id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, task_function, description } = req.body;
    updateCollaboratorById(id, name, task_function, description, (err, result, fields) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.send({ result, fields });
    });
});

module.exports = router;