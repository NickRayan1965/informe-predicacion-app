import { Observable } from 'rxjs';
import { ListResponseDto } from '../../dtos/ListResponseDto';
import { QueryParamsNoPagination } from '../../dtos/QueryParamsNoPagination';

export type ILoadAllDataConfig<Q> = {
  query?: QueryParamsNoPagination<Q>,
  pageSize?: number
}; 
export interface ILoadAllData<T> {
  loadAllData$<Q>(config?: ILoadAllDataConfig<Q>): Observable<ListResponseDto<T>>;
}