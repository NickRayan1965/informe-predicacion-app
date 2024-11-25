import { Block } from '@angular/compiler';
import { IHttpService } from './IHttpService';
import { Observable } from 'rxjs';
import { ListResponseDto } from '../model/dtos/ListResponseDto';
import { HttpClient } from '@angular/common/http';
import { GetBlocksQueryParamsDto } from '../model/dtos/GetBlocksQueryParamsDto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlockService implements IHttpService<Block> {
  private baseUrl = 'http://localhost:4000/blocks';
  constructor(private http: HttpClient) { }

  getAll(queryParams?: GetBlocksQueryParamsDto): Observable<ListResponseDto<Block>> {
    queryParams ??= new GetBlocksQueryParamsDto();
    const params = new URLSearchParams(JSON.parse(JSON.stringify(queryParams))).toString();
    return this.http.get<ListResponseDto<Block>>(this.baseUrl + '?' + params);
  }
  create<C>(data: C): Observable<Block> {
    throw new Error('Method not implemented.');
  }

}