import { Injectable } from '@nestjs/common';
import { HealthChkType } from '../types/healthchk.type';

@Injectable()
export class HealthChkService {
  getStatus(): { ok: HealthChkType } {
    return {
      ok: HealthChkType.CHK_OK,
    };
  }
}
