import { IHttpService } from './IHttpService';
import { Observable } from 'rxjs';
import { ListResponseDto } from '../dtos/ListResponseDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateReportDto } from '../dtos/CreateReportDto';
import { Report } from '../model/Report';
import { GetReportsQueryParamsDto } from '../dtos/GetReportsQueryParamsDto';

@Injectable({
  providedIn: 'root'
})
export class ReportService implements IHttpService<Report> {
  private baseUrl = 'http://localhost:4000/reports';
  constructor(private http: HttpClient) { }

  getAll(queryParams?: GetReportsQueryParamsDto): Observable<ListResponseDto<Report>> {
    queryParams ??= new GetReportsQueryParamsDto();
    const params = new URLSearchParams(JSON.parse(JSON.stringify(queryParams))).toString();
    return this.http.get<ListResponseDto<Report>>(this.baseUrl + '?' + params);
  }
  create<CreateReportDto>(data: CreateReportDto): Observable<Report> {
    return this.http.post<Report>(this.baseUrl, data);
  }

}