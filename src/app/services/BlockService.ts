import { IHttpService } from './IHttpService';
import { concat, concatMap, mergeMap, Observable, of } from 'rxjs';
import { ListResponseDto } from '../dtos/ListResponseDto';
import { HttpClient } from '@angular/common/http';
import { GetBlocksQueryParamsDto } from '../dtos/GetBlocksQueryParamsDto';
import { Injectable } from '@angular/core';
import { CreateBlockDto } from '../dtos/CreateBlockDto';
import { Block } from '../model/Block';
import { QueryParamsNoPagination } from '../dtos/QueryParamsNoPagination';
import { ILoadAllData, ILoadAllDataConfig } from './interfaces/ILoadAllData';
import { HttpServiceHelper } from '../helpers/HttpServiceHelper';

@Injectable({
  providedIn: 'root',
})
export class BlockService implements IHttpService<Block>, ILoadAllData<Block> {
  private baseUrl = 'http://localhost:4000/blocks';
  constructor(
    private http: HttpClient,
    private readonly httpServiceHelper: HttpServiceHelper
  ) {}

  getAllPaginated(
    queryParams?: GetBlocksQueryParamsDto
  ): Observable<ListResponseDto<Block>> {
    queryParams ??= new GetBlocksQueryParamsDto();
    const params = new URLSearchParams(
      JSON.parse(JSON.stringify(queryParams))
    ).toString();
    return this.http.get<ListResponseDto<Block>>(this.baseUrl + '?' + params);
  }

  
  loadAllData$<GetBlocksQueryParamsDto>(
    config?: ILoadAllDataConfig<GetBlocksQueryParamsDto>
  ): Observable<ListResponseDto<Block>> {
    const { query, pageSize = 100 } = config ?? {};
    const queryParams = this.httpServiceHelper.getQueryParams(query);
    return this.httpServiceHelper.getAllDataLoader({
      baseUrl: this.baseUrl,
      pageSize,
      queryParamsString: queryParams,
      httpClient: this.http,
    });
  }

  create<CreateBlockDto>(data: CreateBlockDto): Observable<Block> {
    return this.http.post<Block>(this.baseUrl, data);
  }
}
