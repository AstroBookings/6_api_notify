import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { CreateNotificationDto } from '../src/api/notifications/models/create-notification.dto';
import { NotificationDto } from '../src/api/notifications/models/notification.dto';
import { AppModule } from '../src/app.module';
describe('/api/notifications', () => {
  let app: INestApplication;
  let http: TestAgent;
  const notificationsUrl = '/api/notifications';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .setLogger(console)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    http = request(app.getHttpServer());
  });

  beforeAll(async () => {
    await http.get('/api/admin/regenerate-db').expect(200);
  });

  afterEach(async () => {
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
      const response = await http.get(notificationsUrl).expect(200);
      expect(Array.isArray(response.body)).toBe(true);
      response.body.forEach((notification: NotificationDto) => {
        expect(notification).toHaveProperty('id');
        expect(notification).toHaveProperty('message');
        expect(notification).toHaveProperty('recipient');
        expect(notification).toHaveProperty('createdAt');
      });
    });
  });

  describe('POST /', () => {
    it('should create a new notification', async () => {
      const inputCreateNotificationDto: CreateNotificationDto = {
        templateId: 'tmp_123  ',
        userId: 'usr_123',
        data: JSON.stringify({ bookingId: 'bkn_123' }),
      };

      const response = await http
        .post(notificationsUrl)
        .send(inputCreateNotificationDto)
        .expect(201);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      const createdNotification = response.body[0];
      expect(createdNotification).toHaveProperty('id');
      expect(createdNotification.templateId).toBe(inputCreateNotificationDto.templateId);
      expect(createdNotification.userId).toBe(inputCreateNotificationDto.userId);
      expect(createdNotification.data).toBe(inputCreateNotificationDto.data);
      expect(createdNotification).toHaveProperty('createdAt');
    });

    it('should return 400 for invalid input', async () => {
      const invalidNotification = {
        template_ID: 'tmp_123  ',
        data: '{"bookingId":"bkn_123"}',
      };
      await http.post(notificationsUrl).send(invalidNotification).expect(422);
    });
  });
});
