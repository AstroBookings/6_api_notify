# Add E2E tests for NameController

## Context

We need to add E2E tests for the NameController.

## Process

1. Create a new file for the E2E tests for the NameController.

`test\app.e2e-spec.ts`

2. Import the necessary modules and dependencies.

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import TestAgent from 'supertest/lib/agent';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
```

3. Describe the main resource and its endpoints.

```typescript
describe('/api/name', () => {
  let app: INestApplication;
  let http: TestAgent;
  const nameUrl: string = '/api/name';
  // Arrange Setup
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
    await app.init();
    http = request(app.getHttpServer());
  });

  describe('GET  /ping', () => {
    it('should return pong', async () => {
      // Arrange
      const pingUrl = `${usersUrl}/ping`;
      // Act & Assert
      await http.get(pingUrl).expect(200).expect('pong');
    });
  });
});
```
