import { Observable } from 'rxjs';
import { ListResponseDto } from '../dtos/ListResponseDto';
import { PaginationDto } from '../dtos/PaginationDto';

export interface IHttpService<T> {
  getAll(queryParams?: PaginationDto): Observable<ListResponseDto<T>>;
  create<C>(data: C): Observable<T>;
}