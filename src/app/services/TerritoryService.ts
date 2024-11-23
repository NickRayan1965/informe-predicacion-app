import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Territory } from '../model/Territory';
import { CreateTerritoryDto } from '../model/CreateTerritoryDto';
import { ListResponseDto } from '../model/dtos/ListResponseDto';
import { GetTerritoriesQueryParamsDto } from '../model/dtos/GetTerritoriesQueryParamsDto';

@Injectable({
  providedIn: 'root'
})
export class TerritoryService {
  private baseUrl = 'http://localhost:4000/territories';
  constructor(private http: HttpClient) { }
  getAll(queryParams?: GetTerritoriesQueryParamsDto) {
    queryParams ??= new GetTerritoriesQueryParamsDto();
    const params = new URLSearchParams(JSON.parse(JSON.stringify(queryParams))).toString();
    console.log({params});
    return this.http.get<ListResponseDto<Territory>>(this.baseUrl + '?' + params);
  }
  getById(id: number) {
    return this.http.get<Territory>(`${this.baseUrl}/${id}`);
  }
  create(createTerritoryDto: CreateTerritoryDto) {
    return this.http.post<Territory>(this.baseUrl, createTerritoryDto);
  }
}