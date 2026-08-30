import { NestFactory } from '@nestjs/core'
import { Module, Controller, Get } from '@nestjs/common'

@Controller('health')
class HealthController {
  @Get()
  check() {
    return { status: 'ok', service: 'taxi-cross-border-api' }
  }
}

@Module({ controllers: [HealthController] })
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  await app.listen(process.env.PORT ?? 3000)
}

bootstrap()
