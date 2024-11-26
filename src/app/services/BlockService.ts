import { IHttpService } from './IHttpService';
import { Observable } from 'rxjs';
import { ListResponseDto } from '../dtos/ListResponseDto';
import { HttpClient } from '@angular/common/http';
import { GetBlocksQueryParamsDto } from '../dtos/GetBlocksQueryParamsDto';
import { Injectable } from '@angular/core';
import { CreateBlockDto } from '../dtos/CreateBlockDto';
import { Block } from '../model/Block';

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
  create<CreateBlockDto>(data: CreateBlockDto): Observable<Block> {
    return this.http.post<Block>(this.baseUrl, data);
  }

}