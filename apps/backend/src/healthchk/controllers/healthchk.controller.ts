import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthChkService } from '../services/healthchk.service';
import { HealthChkType } from '../types/healthchk.type';

@ApiTags('healthchk')
@Controller('healthchk')
export class HealthChkController {
  constructor(private readonly HealthChkService: HealthChkService) {}

  @Get()
  @ApiOperation({ summary: 'Return health status of the backend' })
  @ApiResponse({
    status: 200,
    description: 'Everything is okay!',
  })
  getStatus(): { ok: HealthChkType } {
    return this.HealthChkService.getStatus();
  }
}
