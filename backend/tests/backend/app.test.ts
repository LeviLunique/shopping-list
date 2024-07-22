import request from 'supertest';
import app from '../../src/app';

describe('Test the root path', () => {
  it('should respond with a Hello World message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});