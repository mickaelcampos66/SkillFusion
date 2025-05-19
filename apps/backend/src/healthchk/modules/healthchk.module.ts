import { Module } from '@nestjs/common';
import { HealthChkController } from '../controllers/healthchk.controller';
import { HealthChkService } from '../services/healthchk.service';

@Module({
  imports: [],
  controllers: [HealthChkController],
  providers: [HealthChkService],
})
export class HealthChkModule {}
