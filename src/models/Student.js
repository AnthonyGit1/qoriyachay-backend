const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    datos_basicos: {
        nombres: {
            type: String,
            required: true
        },
        apellidos: {
            type: String,
            required: true
        },
        correo: {
            type: String,
            required: true,
            unique: true
        }
    },
    perfil_academico: {
        carrera: {
            type: String,
            required: true
        },
        ciclo: {
            type: Number,
            required: true,
            min: 1,
            max: 10
        },
        intereses: [{
            type: String
        }]
    },
    ruta_aprendizaje: {
        id_ruta: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LearningPath'
        },
        fecha_asignacion: {
            type: Date
        },
        progreso: {
            type: Number,
            default: 0
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);