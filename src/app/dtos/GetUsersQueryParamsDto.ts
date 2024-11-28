import { PaginationDto } from './PaginationDto';

export class GetUsersQueryParamsDto extends PaginationDto {
  completeNameFilter: string;
}