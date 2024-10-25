const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/database');

// Importar rutas
const studentRoutes = require('./routes/studentRoutes');
const learningPathRoutes = require('./routes/learningPathRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/students', studentRoutes);
app.use('/api/learning-paths', learningPathRoutes);

// Ruta principal para verificar que el servidor está funcionando
app.get('/', (req, res) => {
    res.json({ 
        message: 'Qoriyachay API funcionando',
        environment: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    });
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
});

// Railway asignará automáticamente un puerto
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, '0.0.0.0', () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`Ambiente: ${process.env.NODE_ENV}`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;