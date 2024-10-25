const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();
const connectDB = require('./config/database');

// Debug: Mostrar variables disponibles (NO incluir en producción real)
console.log('Variables de entorno disponibles:', {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL ? 'Definida' : 'No definida'
});

const app = express();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/learning-paths', require('./routes/learningPathRoutes'));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'API funcionando',
        environment: process.env.NODE_ENV,
        mongoConnected: mongoose.connection.readyState === 1
    });
});

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
            console.log(`Servidor corriendo en puerto ${PORT}`);
            console.log(`Ambiente: ${process.env.NODE_ENV}`);
        });
    } catch (error) {
        console.error('Error iniciando servidor:', error);
        process.exit(1);
    }
};

startServer();