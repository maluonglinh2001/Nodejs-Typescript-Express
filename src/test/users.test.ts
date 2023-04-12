// import request from 'supertest';
// import { Connection, createConnection, getRepository } from 'typeorm';
// import { App } from '@/app';
// import { User } from '@interfaces/users.interface';
// import { UserModel } from '@models/users.model';
// import { UserRoute } from '@routes/users.route';

// describe('TEST Users API', () => {
//   let app: App;
//   let connection: Connection;

//   beforeAll(async () => {
//     connection = await createConnection();
//     await connection.runMigrations();
//     const userRepository = getRepository(UserModel);
//     await userRepository.save(UserModel);
//     app = new App([new UserRoute()]);
//   });

//   afterAll(async () => {
//     await connection.dropDatabase();
//     await connection.close();
//   });

//   describe('[GET] /users', () => {
//     it('response statusCode 200 /findAll', () => {
//       const findUser: User[] = UserModel;

//       return request(app.getServer()).get(`/users`).expect(200, { data: findUser, message: 'findAll' });
//     });
//   });

//   describe('[GET] /users/:id', () => {
//     it('response statusCode 200 /findOne', () => {
//       const userRepository = getRepository(UserModel);
//       const userId = 1;
//       const findUser = userRepository.findOne(userId);

//       return request(app.getServer()).get(`/users/${userId}`).expect(200, { data: findUser, message: 'findOne' });
//     });
//   });

//   describe('[POST] /users', () => {
//     it('response statusCode 201 /created', async () => {
//       const userData: User = {
//         email: 'example@email.com',
//         password: 'password123456789',
//       };

//       return request(app.getServer()).post(`/users`).send(userData).expect(201);
//     });
//   });

//   describe('[PUT] /users/:id', () => {
//     it('response statusCode 200 /updated', async () => {
//       const userRepository = getRepository(UserModel);
//       const userId = 1;
//       const userData: User = {
//         password: 'password123456789',
//       };
//       await userRepository.update(userId, userData);

//       return request(app.getServer()).put(`/users/${userId}`).send(userData).expect(200);
//     });
//   });

//   describe('[DELETE] /users/:id', () => {
//     it('response statusCode 200 /deleted', async () => {
//       const userRepository = getRepository(UserModel);
//       const userId = 1;
//       const deleteUser = await userRepository.findOne(userId);
//       await userRepository.delete(userId);

//       return request(app.getServer()).delete(`/users/${userId}`).expect(200, { data: deleteUser, message: 'deleted' });
//     });
//   });
// });
