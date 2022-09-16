import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';

let connection : Connection;

describe('Create Category Controller', () => {
  beforeAll(async () => {
    connection = await createConnection(); // localhost
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO USERS(id,name,email,password,"isAdmin",created_at, driver_license) 
      values('${id}', 'admin', 'admin@rentex.com.br', '${password}', true, 'now()','XXXXX')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentex.com.br',
      password: 'admin',
    });

    console.log(responseToken.body);
    // o metodo request tem acesso a todas as requests pertecentes a app
    // o metodo get acessa a rota desejada do tipo get
    // o expect ele espera a response do tipo 200

    const { token } = responseToken.body;
    const response = await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'Category Supertest',
    }).set({
      Authorization: `Bearer ${token}`,
    });
    expect(response.status).toBe(201);
  });

  it('should be able to create a new category with name exists', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentex.com.br',
      password: 'admin',
    });

    console.log(responseToken.body);
    // o metodo request tem acesso   a todas as requests pertecentes a app
    // o metodo get acessa a rota desejada do tipo get
    // o expect ele espera a response do tipo 200

    const { token } = responseToken.body;
    const response = await request(app).post('/categories').send({
      name: 'Category Supertest',
      description: 'Category Supertest',
    }).set({
      Authorization: `Bearer ${token}`,
    });
    expect(response.status).toBe(401);
  });
});
