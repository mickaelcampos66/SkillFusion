import { Injectable } from '@nestjs/common';
import { HealthChkType } from '../types/healthchk.type';

@Injectable()
export class HealthChkService {
  constructor() {}

  getStatus(): { ok: HealthChkType } {
    return {
      ok: HealthChkType.CHK_OK,
    };
  }
}
