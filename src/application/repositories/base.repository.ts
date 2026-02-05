import { PagedResult } from "../dtos/pagination/paged-result";
import { PaginationDto } from "../dtos/pagination/pagination.dto";

export interface BaseRepository<T, F = any> {

  create(entity: T): Promise<T>;

  findById(id: string): Promise<T | null>;

  findByFilters( filters: F, pagination: PaginationDto ): Promise<PagedResult<T>>;

  softDelete(id: string): Promise<void>;
  
}
