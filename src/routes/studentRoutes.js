const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const studentController = require('../controllers/studentController');

// Rutas de estudiantes
router.post('/', studentController.createStudent);

// Ruta GET corregida para obtener todos los estudiantes
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('ruta_aprendizaje.id_ruta');
        res.json({
            success: true,
            count: students.length,
            data: students
        });
    } catch (error) {
        console.error('Error al obtener estudiantes:', error);
        res.status(500).json({
            success: false,
            message: 'Error al obtener los estudiantes'
        });
    }
});

// Ruta para seleccionar una ruta de aprendizaje
router.post('/:id_estudiante/select-path/:id_ruta', studentController.selectLearningPath);

module.exports = router;