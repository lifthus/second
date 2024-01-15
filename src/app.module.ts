import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModelModule } from './model/model.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [ModelModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
