const Student = require('../models/Student');
const recommendationService = require('../services/recommendationService');

const studentController = {
    async createStudent(req, res) {
        try {
            const studentData = req.body;
            
            // Crear estudiante
            const student = await Student.create({
                datos_basicos: {
                    nombres: studentData.nombres,
                    apellidos: studentData.apellidos,
                    correo: studentData.correo
                },
                perfil_academico: {
                    carrera: studentData.carrera,
                    ciclo: studentData.ciclo,
                    intereses: studentData.intereses
                }
            });

            // Obtener recomendación
            const recommendation = await recommendationService.getRecommendedPath(student);
            
            if (recommendation?.mainRecommendation) {
                student.ruta_aprendizaje = {
                    id_ruta: recommendation.mainRecommendation.path._id,
                    fecha_asignacion: new Date(),
                    progreso: 0
                };
                await student.save();
            }

            res.status(201).json({
                success: true,
                data: student,
                recommendation
            });
        } catch (error) {
            console.error('Error:', error);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    },

    async selectLearningPath(req, res) {
        try {
            const { id_estudiante, id_ruta } = req.params;
            
            const student = await Student.findById(id_estudiante);
            const path = await LearningPath.findById(id_ruta);

            if (!student || !path) {
                return res.status(404).json({
                    success: false,
                    message: 'Estudiante o ruta no encontrada'
                });
            }

            // Actualizar ruta del estudiante
            student.ruta_aprendizaje = {
                id_ruta: id_ruta,
                fecha_asignacion: new Date(),
                progreso: 0
            };
            await student.save();

            // Agregar ejemplo de entrenamiento
            await recommendationService.addExample(student, path);

            res.status(200).json({
                success: true,
                data: student
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
};

module.exports = studentController;