# Qoriyachay Backend

Backend del sistema de recomendación de rutas de aprendizaje basado en IA.

## Descripción
API que proporciona recomendaciones de rutas de aprendizaje personalizadas basadas en el perfil del estudiante.

## Tecnologías
- Node.js
- Express
- MongoDB
- Natural (NLP para recomendaciones)

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
```

## Variables de Entorno
```env
NODE_ENV=development
PORT=3000
MONGODB_URL=mongodb://localhost:27017/qoriyachay
```

## Uso
```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## API Endpoints

### Estudiantes
- `POST /api/students` - Obtener ruta de aprendizaje personalizada
- `GET /api/students` - Listar estudiantes registrados

### Rutas de Aprendizaje
- `GET /api/learning-paths` - Listar todas las rutas
- `POST /api/learning-paths` - Crear nueva ruta