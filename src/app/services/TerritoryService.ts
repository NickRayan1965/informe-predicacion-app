import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Territory } from '../model/Territory';
import { CreateTerritoryDto } from '../model/CreateTerritoryDto';

@Injectable({
  providedIn: 'root'
})
export class TerritoryService {
  private baseUrl = 'http://localhost:4000/territories';
  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<Territory[]>(this.baseUrl);
  }
  getById(id: number) {
    return this.http.get<Territory>(`${this.baseUrl}/${id}`);
  }
  create(createTerritoryDto: CreateTerritoryDto) {
    return this.http.post<Territory>(this.baseUrl, createTerritoryDto);
  }
}