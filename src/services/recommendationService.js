const natural = require('natural');
const LearningPath = require('../models/LearningPath');

class RecommendationService {
    constructor() {
        this.classifier = new natural.BayesClassifier();
        this.initialized = false;
    }

    async initialize() {
        if (this.initialized) return;

        try {
            const paths = await LearningPath.find();
            
            // Entrenar el clasificador con datos iniciales
            paths.forEach(path => {
                // Crear documento de entrenamiento para cada ruta
                const trainingText = [
                    path.carrera,
                    ...path.metadata_ia.tags,
                    ...path.metadata_ia.carreras_relacionadas,
                    path.descripcion
                ].join(' ').toLowerCase();

                this.classifier.addDocument(trainingText, path._id.toString());
            });

            // Entrenar el clasificador
            this.classifier.train();
            
            this.initialized = true;
            console.log('Servicio de recomendación inicializado');
        } catch (error) {
            console.error('Error inicializando el servicio:', error);
            throw error;
        }
    }

    processStudentProfile(student) {
        // Crear texto representativo del perfil del estudiante
        return [
            student.perfil_academico.carrera,
            ...student.perfil_academico.intereses,
            `ciclo ${student.perfil_academico.ciclo}`
        ].join(' ').toLowerCase();
    }

    calculateSimilarity(student, path) {
        let score = 0;
        const studentInterests = new Set(student.perfil_academico.intereses.map(i => i.toLowerCase()));
        
        // Coincidencia de carrera (40% del score)
        if (path.metadata_ia.carreras_relacionadas.some(
            c => c.toLowerCase() === student.perfil_academico.carrera.toLowerCase()
        )) {
            score += 0.4;
        }

        // Coincidencia de intereses (40% del score)
        const matchingInterests = path.metadata_ia.tags.filter(
            tag => studentInterests.has(tag.toLowerCase())
        ).length;
        score += (matchingInterests / Math.max(path.metadata_ia.tags.length, 1)) * 0.4;

        // Ajuste por ciclo (20% del score)
        const cicloScore = Math.min(student.perfil_academico.ciclo / 10, 1) * 0.2;
        score += cicloScore;

        return score;
    }

    async getRecommendedPath(student) {
        try {
            await this.initialize();

            const studentProfile = this.processStudentProfile(student);
            const paths = await LearningPath.find();

            if (paths.length === 0) {
                return null;
            }

            // Obtener clasificación inicial
            const classifications = this.classifier.getClassifications(studentProfile);

            // Calcular scores finales combinando clasificación con similitud
            const recommendations = await Promise.all(
                paths.map(async path => {
                    const classificationScore = classifications.find(
                        c => c.label === path._id.toString()
                    )?.value || 0;

                    const similarityScore = this.calculateSimilarity(student, path);

                    // Score final (combinación de ambos)
                    const finalScore = (classificationScore * 0.6) + (similarityScore * 0.4);

                    return {
                        path: path,
                        score: finalScore,
                        metrics: {
                            classification: classificationScore,
                            similarity: similarityScore
                        }
                    };
                })
            );

            // Ordenar por score
            recommendations.sort((a, b) => b.score - a.score);

            return {
                mainRecommendation: {
                    path: recommendations[0].path,
                    confidence: recommendations[0].score,
                    metrics: recommendations[0].metrics
                },
                alternatives: recommendations.slice(1, 3).map(r => ({
                    path: r.path,
                    confidence: r.score,
                    metrics: r.metrics
                }))
            };

        } catch (error) {
            console.error('Error en recomendación:', error);
            throw error;
        }
    }

    async addExample(student, selectedPath) {
        try {
            const trainingText = this.processStudentProfile(student);
            this.classifier.addDocument(trainingText, selectedPath._id.toString());
            this.classifier.train();
            
            return true;
        } catch (error) {
            console.error('Error agregando ejemplo:', error);
            return false;
        }
    }
}

module.exports = new RecommendationService();