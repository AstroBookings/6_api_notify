import * as request from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { CreateNotificationsDto } from '../src/api/notifications/models/create-notification.dto';
import { NotificationDto } from '../src/api/notifications/models/notification.dto';

describe('/api/notifications', () => {
  let http: TestAgent;
  const notificationsUrl = 'http://localhost:3106/api';

  // Arrange: Initialize the Nest application before each test
  beforeEach(async () => {
    http = request.agent(notificationsUrl);
    await http.post('/admin/regenerate-db').expect(200);
  });

  afterEach(async () => {});

  describe('GET /ping', () => {
    it('should return pong', async () => {
      const pingUrl = `/notifications/ping`;
      await http.get(pingUrl).expect(200).expect('pong');
    });
  });

  describe('GET /', () => {
    it('should return an array of pending notifications', async () => {
      // Act: Get all pending notifications
      const actualResponse = await http.get('/notifications').expect(200);
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
        .post('/notifications')
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
      await http.post('/notifications').send(invalidNotification).expect(422);
    });
  });
});
