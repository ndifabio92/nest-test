import { NestFactory } from '@nestjs/core';
import { bootstrap } from './main';
import { AppModule } from './app.module';
import { corsConfig } from './config/app.config';

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockResolvedValue({
      useGlobalPipes: jest.fn(),
      setGlobalPrefix: jest.fn(),
      listen: jest.fn(),
      enableCors: jest.fn(),
    }),
  },
}));

describe('Main.ts Bootstrap', () => {
  let mockApp: {
    useGlobalPipes: jest.Mock;
    setGlobalPrefix: jest.Mock;
    listen: jest.Mock;
    enableCors: jest.Mock;
  };

  beforeEach(() => {
    mockApp = {
      useGlobalPipes: jest.fn(),
      setGlobalPrefix: jest.fn(),
      listen: jest.fn(),
      enableCors: jest.fn(),
    };

    (NestFactory.create as jest.Mock).mockResolvedValue(mockApp);
  });

  it('should create application', async () => {
    await bootstrap();
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
  });

  it('should set global prefix', async () => {
    await bootstrap();

    expect(mockApp.setGlobalPrefix).toHaveBeenCalledWith('api');
  });

  it('should listen on port 3000 if env port not set', async () => {
    await bootstrap();

    expect(mockApp.listen).toHaveBeenCalledWith(3000);
  });

  it('should listen on env port', async () => {
    process.env.PORT = '4200';

    await bootstrap();

    expect(mockApp.listen).toHaveBeenCalledWith(process.env.PORT);
  });

  it('should use global pipes', async () => {
    await bootstrap();

    expect(mockApp.useGlobalPipes).toHaveBeenCalledWith(
      expect.objectContaining({
        errorHttpStatusCode: 400,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        validatorOptions: expect.objectContaining({
          forbidNonWhitelisted: true,
          whitelist: true,
        }),
      }),
    );
  });

  it('should enable CORS with environment config', async () => {
    process.env.NODE_ENV = 'development';
    await bootstrap();

    expect(mockApp.enableCors).toHaveBeenCalledWith(corsConfig.development);
  });
});
