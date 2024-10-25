const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose'); // Agregamos esta línea
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta principal - Health check
app.get('/', async (req, res) => {
    try {
        res.json({
            status: 'success',
            message: 'Qoriyachay API v1.0',
            environment: process.env.NODE_ENV,
            database: {
                status: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
            },
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al verificar el estado del servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Rutas de la API
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/learning-paths', require('./routes/learningPathRoutes'));

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Error del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`✅ Servidor corriendo en puerto ${PORT}`);
            console.log(`🌍 Ambiente: ${process.env.NODE_ENV}`);
            console.log(`📊 MongoDB Status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
        });
    } catch (error) {
        console.error('❌ Error al iniciar servidor:', error);
    }
};

startServer();

module.exports = app;