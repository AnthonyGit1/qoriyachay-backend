const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Verificar variable de entorno
    if (!process.env.MONGODB_URL) {
      throw new Error('⚠️ La variable MONGODB_URL no está definida');
    }

    console.log('🔄 Intentando conectar a MongoDB...');
    
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('❌ Error de conexión MongoDB:', error.message);
    throw error;
  }
};

module.exports = connectDB;