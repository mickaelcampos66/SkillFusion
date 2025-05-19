import { MetaType } from 'src/type/MetaType';
import { PaginationLinksType } from 'src/type/PaginationLinksType';

export interface IApiResponse<T> {
  data: T;
  meta?: MetaType;
  message: string;
  links?: PaginationLinksType;
}
