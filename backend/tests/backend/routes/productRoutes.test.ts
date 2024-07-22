import request from 'supertest';
import app from '../../../src/app';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Product Routes', () => {
  afterEach(async () => {
    await prisma.product.deleteMany({});
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      value: 15.0,
    };

    const response = await request(app)
      .post('/products')
      .send(newProduct)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newProduct.name);
    expect(response.body.value).toBe(newProduct.value);
  });

  it('should return 400 if product name is too long', async () => {
    const newProduct = {
      name: 'a'.repeat(256),
      value: 20.0,
    };

    const response = await request(app)
      .post('/products')
      .send(newProduct)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Product name is too long. Maximum length is 255 characters.');
  });

  it('should return 500 if there is an internal server error', async () => {
    jest.spyOn(prisma.product, 'create').mockImplementationOnce(() => {
      throw new Error('Internal Server Error');
    });

    const newProduct = {
      name: 'Error Product',
      value: 30.0,
    };

    const response = await request(app)
      .post('/products')
      .send(newProduct)
      .expect('Content-Type', /json/)
      .expect(500);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toBe('Internal Server Error');
  });
});