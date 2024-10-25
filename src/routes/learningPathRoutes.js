const express = require('express');
const router = express.Router();
const LearningPath = require('../models/LearningPath');

// Crear nueva ruta de aprendizaje
router.post('/', async (req, res) => {
    try {
        const path = await LearningPath.create(req.body);
        res.status(201).json({ success: true, data: path });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// Obtener todas las rutas
router.get('/', async (req, res) => {
    try {
        const paths = await LearningPath.find();
        res.json({ success: true, data: paths });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;