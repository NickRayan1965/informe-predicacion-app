import { Inject, Injectable } from '@angular/core';
import { QueryParamsNoPagination } from '../dtos/QueryParamsNoPagination';
import { concat, concatMap, Observable, of } from 'rxjs';
import { ListResponseDto } from '../dtos/ListResponseDto';
import { HttpClient } from '@angular/common/http';
export type GetAllPetitionsConcated<T> = {
  baseUrl: string;
  pageSize: number;
  queryParamsString: string;
  httpClient: HttpClient;
};
export type GetAllDataLoader<T> = GetAllPetitionsConcated<T>;
@Injectable({
  providedIn: 'root',
})
export class HttpServiceHelper {
  getQueryParams<T>(queryParams: QueryParamsNoPagination<T>): string {
    let queryParamsString = '';
    if (queryParams) {
      queryParamsString += '&' + new URLSearchParams(JSON.parse(JSON.stringify(queryParams))).toString();
    }
    return queryParamsString;
  }
  getAllPetitionsConcated<T>(config: GetAllPetitionsConcated<T>) {
    const {
      baseUrl,
      pageSize,
      queryParamsString,
      httpClient,
    } = config;
    return concatMap((response: ListResponseDto<T>) => {
      const pagePetitions: Observable<ListResponseDto<T>>[] = [];
      for (let i = 2; i <= response.totalPages; i++) {
        pagePetitions.push(
          httpClient.get<ListResponseDto<T>>(
            baseUrl + `?pageSize=${pageSize}&page=${i}` + queryParamsString
          )
        );
      }
      return concat(of(response), ...pagePetitions);
    });
  }
  
  getAllDataLoader<T>(config: GetAllDataLoader<T>) {
    const {
      baseUrl,
      pageSize,
      queryParamsString,
      httpClient,
    } = config;
    return httpClient.get<ListResponseDto<T>>(
      baseUrl + `?pageSize=${pageSize}&page=1` + queryParamsString
    ).pipe(
      this.getAllPetitionsConcated({
        baseUrl,
        pageSize,
        queryParamsString,
        httpClient,
      }),
    );
  }
}