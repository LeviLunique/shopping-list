import request from 'supertest';
import server from '../../src/server';

describe('Server initialization', () => {
  afterAll((done) => {
    server.close(done);
  });

  it('should start the server and respond to requests', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});