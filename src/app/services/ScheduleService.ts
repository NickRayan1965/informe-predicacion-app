import { IHttpService } from './IHttpService';
import { Observable } from 'rxjs';
import { ListResponseDto } from '../dtos/ListResponseDto';
import { HttpClient } from '@angular/common/http';
import { GetSchedulesQueryParamsDto } from '../dtos/GetSchedulesQueryParamsDto';
import { Injectable } from '@angular/core';
import { Schedule } from '../model/Schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService implements IHttpService<Schedule> {
  private baseUrl = 'http://localhost:4000/schedules';
  constructor(private http: HttpClient) { }

  getAll(queryParams?: GetSchedulesQueryParamsDto): Observable<ListResponseDto<Schedule>> {
    queryParams ??= new GetSchedulesQueryParamsDto();
    const params = new URLSearchParams(JSON.parse(JSON.stringify(queryParams))).toString();
    return this.http.get<ListResponseDto<Schedule>>(this.baseUrl + '?' + params);
  }
  create<CreateScheduleDto>(data: CreateScheduleDto): Observable<Schedule> {
    return this.http.post<Schedule>(this.baseUrl, data);
  }

}