const mongoose = require('mongoose');

const learningPathSchema = new mongoose.Schema({
    nombre_ruta: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    carrera: {
        type: String,
        required: true
    },
    modulos: [{
        nombre: {
            type: String,
            required: true
        },
        orden: {
            type: Number,
            required: true
        },
        duracion_estimada: String,
        contenido: [{
            tipo: String,
            titulo: String,
            descripcion: String,
            url_recurso: String,
            tiempo_estimado: Number
        }]
    }],
    metadata_ia: {
        tags: [String],
        carreras_relacionadas: [String]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('LearningPath', learningPathSchema);