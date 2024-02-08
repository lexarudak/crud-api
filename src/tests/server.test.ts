import request = require('supertest');
import Server from '../server';
import {describe, expect, test} from '@jest/globals';

const testUser = {
  id: 'testId',
  username: 'testUsername',
  age: 2,
  hobbies: ['1', '2']
}

const testUser2 = {
  id: 'testId2',
  username: 'testUsername2',
  age: 22,
  hobbies: []
}


describe('Server', () => {
  test('should return empty array', async () => {
    const mockStore = new Map()
    const { server } = new Server(mockStore)

    const { statusCode, text } = await request(server).get('/api/users');

    expect(statusCode).toEqual(200);
    expect(text).toEqual("[]");
  });

  test('should return all users', async () => {
    const mockStore = new Map()
    mockStore.set("test", testUser)
    mockStore.set("test2", testUser2)
    const { server } = new Server(mockStore)

    const { text } = await request(server).get('/api/users');

    const [user, user2] = JSON.parse(text)
    expect(user).toEqual(testUser);
    expect(user2).toEqual(testUser2);
  });


  test('should create a new record', async () => {
    const mockStore = new Map()
    const { server } = new Server(mockStore)
    const { statusCode, text } = await request(server).post('/api/users').send(testUser); 

    const user = JSON.parse(text)

    expect(statusCode).toEqual(201);
    expect(user.username).toEqual(testUser.username);
    expect(user.age).toEqual(testUser.age);
    expect(user.hobbies).toEqual(testUser.hobbies);
  });

  test('should return a new record', async () => {
    const mockStore = new Map()
    const { server } = new Server(mockStore)
    const { text } = await request(server).post('/api/users').send(testUser); 
    const { id } = JSON.parse(text)

    const { statusCode, text: getText } = await request(server).get(`/api/users/${id}`);
    const user = JSON.parse(getText)

    expect(statusCode).toEqual(200);
    expect(user.username).toEqual(testUser.username);
    expect(user.age).toEqual(testUser.age);
    expect(user.hobbies).toEqual(testUser.hobbies);
  });

  test('should update only one field in record', async () => {
    const mockStore = new Map()
    const { server } = new Server(mockStore)
    mockStore.set("test", testUser)
    await request(server).put('/api/users/test').send({
      age: 111
    }); 

    const { statusCode, text: getText } = await request(server).get(`/api/users/test`);
    const user = JSON.parse(getText)

    expect(statusCode).toEqual(200);
    expect(user.username).toEqual(testUser.username);
    expect(user.age).toEqual(111);
    expect(user.hobbies).toEqual(testUser.hobbies);
  });

  test('should delete record', async () => {
    const mockStore = new Map()
    mockStore.set("test", testUser)
    const { server } = new Server(mockStore)
    const { statusCode } = await request(server).delete('/api/users/test')
    expect(statusCode).toEqual(204);

    const { text } = await request(server).get('/api/users');
    expect(text).toEqual("[]");
  });
});