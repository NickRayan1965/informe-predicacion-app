// private Integer page;
// private Integer pageSize;
// private Integer totalPages;
// private Long totalElements;
// private List<T> data;
export class ListResponseDto<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  data: T[];
}