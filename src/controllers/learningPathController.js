const LearningPath = require('../models/LearningPath');

const learningPathController = {
    // Crear nueva ruta de aprendizaje
    async createPath(req, res) {
        try {
            const pathData = req.body;
            const learningPath = await LearningPath.create(pathData);
            
            res.status(201).json({
                success: true,
                data: learningPath
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    // Obtener todas las rutas
    async getPaths(req, res) {
        try {
            const paths = await LearningPath.find();
            res.status(200).json({
                success: true,
                data: paths
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    // Obtener rutas por carrera
    async getPathsByCareer(req, res) {
        try {
            const { carrera } = req.params;
            const paths = await LearningPath.find({ carrera });
            
            res.status(200).json({
                success: true,
                data: paths
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = learningPathController;