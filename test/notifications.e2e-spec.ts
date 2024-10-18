import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { CreateNotificationsDto } from '../src/api/notifications/models/create-notification.dto';
import { NotificationDto } from '../src/api/notifications/models/notification.dto';
import { AppModule } from '../src/app.module';
describe('/api/notifications', () => {
  let app: INestApplication;
  let http: TestAgent;
  const notificationsUrl = '/api/notifications';

  // Arrange: Initialize the Nest application before each test
  beforeEach(async () => {
    // Arrange : create the app with the testing module, no need to run the app outside of the tests
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      //.setLogger(console)
      .compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    http = request(app.getHttpServer());
    await http.post('/api/admin/regenerate-db').expect(200);
  });

  afterEach(async () => {
    // Cleanup: Close the Nest application after each test
    await app.close();
  });

  describe('GET /ping', () => {
    it('should return pong', async () => {
      const pingUrl = `${notificationsUrl}/ping`;
      await http.get(pingUrl).expect(200).expect('pong');
    });
  });

  describe('GET /', () => {
    it('should return an array of pending notifications', async () => {
      // Act: Get all pending notifications
      const actualResponse = await http.get(notificationsUrl).expect(200);
      const actualBody = actualResponse.body as NotificationDto[];
      // Assert: Check if the response is an array and has the expected properties
      expect(Array.isArray(actualBody)).toBe(true);
      actualBody.forEach((notification: NotificationDto) => {
        expect(notification).toHaveProperty('id');
        expect(notification).toHaveProperty('message');
        expect(notification).toHaveProperty('recipient');
      });
    });
  });

  describe('POST /', () => {
    it('should create a new notification', async () => {
      // Arrange: Create a new notification
      const inputCreateNotificationDto: CreateNotificationsDto = {
        templateId: 'tmpl_1',
        userId: 'usr_123',
        data: JSON.stringify({ bookingId: 'bkn_123' }),
      };

      // Act: Send the notification and expect a 201 status code
      const actualResponse = await http
        .post(notificationsUrl)
        .send(inputCreateNotificationDto)
        .expect(201);
      const actualBody = actualResponse.body as NotificationDto[];
      // Assert: Check if the response is an array and has the expected properties
      expect(Array.isArray(actualBody)).toBe(true);
      expect(actualBody.length).toBe(1);
      const createdNotification = actualBody[0];
      expect(createdNotification).toHaveProperty('id');
      expect(createdNotification.templateId).toBe(inputCreateNotificationDto.templateId);
      expect(createdNotification.userId).toBe(inputCreateNotificationDto.userId);
      expect(createdNotification.data).toBe(inputCreateNotificationDto.data);
      expect(createdNotification).toHaveProperty('createdAt');
    });

    it('should return 400 for invalid input', async () => {
      // Arrange: Create an invalid notification
      const invalidNotification = {
        template_ID: 'tmp_123  ',
        data: '{"bookingId":"bkn_123"}',
      };
      // Act & Assert: Send the invalid notification and expect a 422 status code
      await http.post(notificationsUrl).send(invalidNotification).expect(422);
    });
  });
});
