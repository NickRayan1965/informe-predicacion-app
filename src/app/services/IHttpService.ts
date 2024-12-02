import { Observable } from 'rxjs';
import { ListResponseDto } from '../dtos/ListResponseDto';
import { PaginationDto } from '../dtos/PaginationDto';

export interface IHttpService<T> {
  getAllPaginated(queryParams?: PaginationDto): Observable<ListResponseDto<T>>;
  create<C>(data: C): Observable<T>;
}