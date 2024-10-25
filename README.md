# Qoriyachay Backend API

<div align="center">

![Qoriyachay Logo](assets/logo.png)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app)
![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2014.0.0-brightgreen)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=flat&logo=express&logoColor=%2361DAFB)

*Sistema de recomendación de rutas de aprendizaje impulsado por IA*

</div>

## 📋 Índice
- [Descripción General](#-descripción-general)
- [Características](#-características)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Uso](#-uso)
- [API Endpoints](#-api-endpoints)
- [Tecnologías](#-tecnologías)
- [Despliegue](#-despliegue)
- [Contribución](#-contribución)

## 🎯 Descripción General

Qoriyachay es una API de recomendación inteligente que utiliza procesamiento de lenguaje natural para sugerir rutas de aprendizaje personalizadas basadas en el perfil académico del estudiante. El sistema analiza múltiples factores como la carrera, intereses y nivel académico para proporcionar recomendaciones precisas y relevantes.

## ✨ Características

- 🤖 Sistema de recomendación basado en IA
- 📚 Rutas de aprendizaje personalizadas
- 🎯 Matching inteligente de perfiles
- 📊 Análisis de compatibilidad
- 🔄 Integración continua con Railway
- 🗃️ Base de datos MongoDB

## 📋 Requisitos Previos

- Node.js >= 14.0.0
- npm >= 6.14.0
- MongoDB
- Git

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/AnthonyGit1/qoriyachay-backend.git

# Entrar al directorio
cd qoriyachay-backend

# Instalar dependencias
npm install
```

## ⚙️ Configuración

1. Crear archivo `.env` en la raíz del proyecto:

```env
NODE_ENV=development
PORT=3000
MONGODB_URL=tu_url_de_mongodb
```

2. Configurar la base de datos:
```bash
# Asegúrate que MongoDB está corriendo
mongod

# En otra terminal
npm run dev
```

## 📖 Uso

```bash
# Modo desarrollo
npm run dev

# Modo producción
npm start
```

## 🛣️ API Endpoints

### Estudiantes

```http
# Crear estudiante y obtener recomendación
POST /api/students

# Request Body
{
    "nombres": "String",
    "apellidos": "String",
    "correo": "String",
    "carrera": "String",
    "ciclo": Number,
    "intereses": [String]
}

# Response
{
    "success": true,
    "data": {
        "student": {...},
        "recommendation": {...}
    }
}
```

### Rutas de Aprendizaje

```http
# Obtener todas las rutas
GET /api/learning-paths

# Crear nueva ruta
POST /api/learning-paths

# Request Body
{
    "nombre_ruta": "String",
    "descripcion": "String",
    "carrera": "String",
    "modulos": [{
        "nombre": "String",
        "orden": Number,
        "duracion_estimada": "String",
        "contenido": [{
            "tipo": "String",
            "titulo": "String",
            "descripcion": "String",
            "url_recurso": "String",
            "tiempo_estimado": Number
        }]
    }],
    "metadata_ia": {
        "tags": ["String"],
        "carreras_relacionadas": ["String"]
    }
}
```

## 🛠️ Tecnologías

- [Express.js](https://expressjs.com/) - Framework web
- [MongoDB](https://www.mongodb.com/) - Base de datos
- [Mongoose](https://mongoosejs.com/) - ODM para MongoDB
- [Natural](https://github.com/NaturalNode/natural) - Procesamiento de lenguaje natural
- [Railway](https://railway.app/) - Plataforma de despliegue

## 🚢 Despliegue

El proyecto está configurado para despliegue automático en Railway.

1. Conectar con GitHub:
```bash
# Asegúrate de que todos los cambios estén commiteados
git push origin main
```

2. Railway desplegará automáticamente los cambios

3. Variables de entorno en Railway:
- `NODE_ENV=production`
- `MONGODB_URL=tu_url_de_mongodb`

## 👥 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: nueva característica'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---
<div align="center">
Desarrollado con ❤️ por el equipo Qoriyachay
</div>