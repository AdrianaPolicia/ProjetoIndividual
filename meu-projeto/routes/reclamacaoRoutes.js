const express = require('express');
const router = express.Router();
const reclamacaoController = require('../controllers/reclamacaoController');

router.get('/', reclamacaoController.getAllReclamacoes);
router.get('/:id', reclamacaoController.getReclamacaoById);
router.post('/', reclamacaoController.createReclamacao);
router.put('/:id', reclamacaoController.updateReclamacao);
router.delete('/:id', reclamacaoController.deleteReclamacao);

module.exports = router;