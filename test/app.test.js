const request = require('supertest');
const app = require('../app');
const { calculateValue } = require('../lib/logic');

describe('Suite de Pruebas de Calidad de Software', () => {

    describe('Pruebas Unitarias - Lógica de Inventario', () => {
        test('Debe calcular correctamente el valor total (10*5=50)', () => {
            const result = calculateValue(10, 5);
            expect(result).toBe(50);
        });

        test('Debe retornar 0 si se ingresan valores negativos', () => {
            const result = calculateValue(-10, 5);
            expect(result).toBe(1);
        });

        // DESAFÍO: 2 Validaciones Adicionales en Jest
        test('EXTRA 1: Debe retornar 0 si el stock es 0', () => {
            const result = calculateValue(150, 0);
            expect(result).toBe(0);
        });

        test('EXTRA 2: Debe calcular correctamente con valores decimales', () => {
            const result = calculateValue(10.5, 2);
            expect(result).toBe(21);
        });
    });

    describe('Pruebas de Integración - API Endpoints', () => {
        test('GET /health - Debe responder con status 200 y JSON correcto', async () => {
            const response = await request(app).get('/health');
            expect(response.statusCode).toBe(200);
            expect(response.body).toHaveProperty('status', 'OK');
        });

        test('GET /items - Debe validar la estructura del inventario', async () => {
            const response = await request(app).get('/items');
            expect(response.statusCode).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body[0]).toHaveProperty('id');
            expect(response.body[0]).toHaveProperty('stock');
        });

        // DESAFÍO: 2 Validaciones Adicionales en Supertest
        test('EXTRA 1: GET /ruta-inexistente - Debe retornar código 404 (Not Found)', async () => {
            const response = await request(app).get('/ruta-que-no-existe');
            expect(response.statusCode).toBe(404);
        });

        test('EXTRA 2: GET / - El endpoint principal debe responder exitosamente', async () => {
            const response = await request(app).get('/');
            expect(response.statusCode).toBe(200);
        });
    });
});