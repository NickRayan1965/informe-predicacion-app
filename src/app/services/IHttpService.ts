import { Observable } from 'rxjs';
import { ListResponseDto } from '../model/dtos/ListResponseDto';
import { PaginationDto } from '../model/dtos/PaginationDto';

export interface IHttpService<T> {
  getAll(queryParams?: PaginationDto): Observable<ListResponseDto<T>>;
  create<C>(data: C): Observable<T>;
}