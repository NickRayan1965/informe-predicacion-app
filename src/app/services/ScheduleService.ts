import { IHttpService } from './IHttpService';
import { Observable } from 'rxjs';
import { ListResponseDto } from '../dtos/ListResponseDto';
import { HttpClient } from '@angular/common/http';
import { GetSchedulesQueryParamsDto } from '../dtos/GetSchedulesQueryParamsDto';
import { Injectable } from '@angular/core';
import { Schedule } from '../model/Schedule';
import { ILoadAllData, ILoadAllDataConfig } from './interfaces/ILoadAllData';
import { HttpServiceHelper } from '../helpers/HttpServiceHelper';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService implements IHttpService<Schedule>, ILoadAllData<Schedule> {
  private baseUrl = 'http://localhost:4000/schedules';
  constructor(
    private http: HttpClient,
    private readonly httpServiceHelper: HttpServiceHelper
  ) { }
  
  loadAllData$<Q>(config?: ILoadAllDataConfig<Q>): Observable<ListResponseDto<Schedule>> {
    const { query, pageSize = 100 } = config ?? {};
    const queryParams = this.httpServiceHelper.getQueryParams(query);
    return this.httpServiceHelper.getAllDataLoader({
      baseUrl: this.baseUrl,
      pageSize,
      queryParamsString: queryParams,
      httpClient: this.http,
    });
  }

  getAllPaginated(queryParams?: GetSchedulesQueryParamsDto): Observable<ListResponseDto<Schedule>> {
    queryParams ??= new GetSchedulesQueryParamsDto();
    const params = new URLSearchParams(JSON.parse(JSON.stringify(queryParams))).toString();
    return this.http.get<ListResponseDto<Schedule>>(this.baseUrl + '?' + params);
  }
  create<CreateScheduleDto>(data: CreateScheduleDto): Observable<Schedule> {
    return this.http.post<Schedule>(this.baseUrl, data);
  }

}