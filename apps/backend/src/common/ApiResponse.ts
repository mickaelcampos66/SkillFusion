import { MetaType } from 'src/type/MetaType';
import { PaginationLinksType } from 'src/type/PaginationLinksType';

export class ApiResponse<T> {
  constructor(
    public data: T,
    public meta?: MetaType,
    public message: string = 'Success',
    public links?: PaginationLinksType,
  ) {}
}
