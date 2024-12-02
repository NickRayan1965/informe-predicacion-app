import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Territory } from '../model/Territory';
import { CreateTerritoryDto } from '../model/CreateTerritoryDto';
import { ListResponseDto } from '../dtos/ListResponseDto';
import { GetTerritoriesQueryParamsDto } from '../dtos/GetTerritoriesQueryParamsDto';
import { IHttpService } from './IHttpService';
import { Observable } from 'rxjs';
import { HttpServiceHelper } from '../helpers/HttpServiceHelper';
import { ILoadAllData, ILoadAllDataConfig } from './interfaces/ILoadAllData';

@Injectable({
  providedIn: 'root'
})
export class TerritoryService implements IHttpService<Territory>, ILoadAllData<Territory> {
  private baseUrl = 'http://localhost:4000/territories';
  constructor(
    private http: HttpClient,
    private readonly httpServiceHelper: HttpServiceHelper
  ) { }
  loadAllData$(config?: ILoadAllDataConfig<GetTerritoriesQueryParamsDto>): Observable<ListResponseDto<Territory>> {
    const { query, pageSize = 100 } = config ?? {};
    const queryParams = this.httpServiceHelper.getQueryParams(query);
    return this.httpServiceHelper.getAllDataLoader({
      baseUrl: this.baseUrl,
      pageSize,
      queryParamsString: queryParams,
      httpClient: this.http,
    });
  }

  create<CreateTerritoryDto>(data: CreateTerritoryDto): Observable<Territory> {
    return this.http.post<Territory>(this.baseUrl, data);
  }
  
  getAllPaginated(queryParams?: GetTerritoriesQueryParamsDto) {
    queryParams ??= new GetTerritoriesQueryParamsDto();
    const params = new URLSearchParams(JSON.parse(JSON.stringify(queryParams))).toString();
    return this.http.get<ListResponseDto<Territory>>(this.baseUrl + '?' + params);
  }
  getById(id: number) {
    return this.http.get<Territory>(`${this.baseUrl}/${id}`);
  }
  
}