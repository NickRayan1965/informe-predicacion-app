import { Injectable } from '@angular/core';
import { IHttpService } from './IHttpService';
import { User } from '../model/User';
import { Observable } from 'rxjs';
import { ListResponseDto } from '../dtos/ListResponseDto';
import { PaginationDto } from '../dtos/PaginationDto';
import { HttpClient } from '@angular/common/http';

@Injectable(
  { providedIn: 'root' }
)
export class UserService implements IHttpService<User> {

  private baseUrl = 'http://localhost:4000/users';
  constructor(private http: HttpClient) { }

  getAll(queryParams?: PaginationDto): Observable<ListResponseDto<User>> {
    return this.http.get<ListResponseDto<User>>(this.baseUrl);
  }
  create<C>(data: C): Observable<User> {
    throw new Error('Method not implemented.');
  }
} 