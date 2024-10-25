const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Importante: Railway usa MONGODB_URL por defecto
    const mongoURI = process.env.MONGODB_URL || process.env.MONGODB_URI || 'mongodb://localhost:27017/qoriyachay';
    
    console.log('Intentando conectar a MongoDB...'); // Debug
    console.log('MongoDB URI:', mongoURI.replace(/mongodb\+srv:\/\/([^:]+):([^@]+)@/, 'mongodb+srv://[USER]:[PASSWORD]@')); // Debug seguro
    
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error de conexión MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;