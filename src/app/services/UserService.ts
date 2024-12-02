import { Injectable } from '@angular/core';
import { IHttpService } from './IHttpService';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { ListResponseDto } from '../dtos/ListResponseDto';
import { PaginationDto } from '../dtos/PaginationDto';
import { HttpClient } from '@angular/common/http';
import { ILoadAllData, ILoadAllDataConfig } from './interfaces/ILoadAllData';
import { HttpServiceHelper } from '../helpers/HttpServiceHelper';

@Injectable(
  { providedIn: 'root' }
)
export class UserService implements IHttpService<User>, ILoadAllData<User> {

  private baseUrl = 'http://localhost:4000/users';
  constructor(
    private http: HttpClient,
    private readonly httpServiceHelper: HttpServiceHelper
  ) { }
  loadAllData$(config?: ILoadAllDataConfig<PaginationDto>): Observable<ListResponseDto<User>> {
    const { query, pageSize = 100 } = config ?? {};
    const queryParams = this.httpServiceHelper.getQueryParams(query);
    return this.httpServiceHelper.getAllDataLoader({
      baseUrl: this.baseUrl,
      pageSize,
      queryParamsString: queryParams,
      httpClient: this.http,
    });
  }

  getAllPaginated(queryParams?: PaginationDto): Observable<ListResponseDto<User>> {
    return this.http.get<ListResponseDto<User>>(this.baseUrl);
  }
  create<C>(data: C): Observable<User> {
    throw new Error('Method not implemented.');
  }
} 