import { PaginationDto } from './PaginationDto';

export type QueryParamsNoPagination<T> = Omit<T, keyof PaginationDto>;