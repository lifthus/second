import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { ModelModule } from './model/model.module';

@Module({
  imports: [ApiModule, ModelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
