import request from 'supertest';
import { mockExpressApp } from '../../utils';
import gameServiceRouter from '@sudoku-backend/services/game/router';

describe('POST /api/game', () => {
  let response: request.Response;

  describe('given an empty request body', () => {
    beforeAll(async () => {
      response = await request(mockExpressApp('/api/game', gameServiceRouter))
        .post('/api/game')
        .send();
    });

    it('should respond with a 201 status code', () => {
      expect(response.status).toBe(201);
    });

    describe('response body properties', () => {
      describe('difficulty', () => {
        it('should be present', () => {
          expect(response.body).toHaveProperty('difficulty');
        });

        it('should be a string', () => {
          expect(typeof response.body.difficulty).toBe('string');
        });

        it('should default to beginner', () => {
          expect(response.body.difficulty).toBe('beginner');
        });
      });

      describe('grid', () => {
        it('should be present', () => {
          expect(response.body).toHaveProperty('grid');
        });

        it('should be an object', () => {
          expect(typeof response.body.grid).toBe('object');
        });

        it('should have a scale property', () => {
          expect(response.body.grid).toHaveProperty('scale');
        });

        it('should default to a scale of 9', () => {
          expect(response.body.grid.scale).toBe(9);
        });

        it('should have a cells property', () => {
          expect(response.body.grid).toHaveProperty('cells');
        });

        it('should have cells as an array', () => {
          expect(Array.isArray(response.body.grid.cells)).toBe(true);
        });
      });
    });
  });
});
