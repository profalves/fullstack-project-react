import IStock from 'interfaces/models/stock';
import { IPaginationParams, IPaginationResponse } from 'interfaces/pagination';
import { Observable } from 'rxjs';

import apiService, { ApiService } from './api';

export class StockService {
  constructor(private apiService: ApiService) {}

  public list(params: IPaginationParams): Observable<IPaginationResponse<IStock>> {
    return this.apiService.get('/stock/product', params);
  }

  public save(model: IStock): Observable<IStock> {
    return this.apiService.post('/stock/product/save', model);
  }

  public delete(id: number): Observable<void> {
    return this.apiService.delete(`/stock/product/${id}`);
  }
}

const userService = new StockService(apiService);
export default userService;
