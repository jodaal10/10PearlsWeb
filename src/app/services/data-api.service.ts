import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Endpoint } from '../config/api';
import { response } from '../models/response';
import { customer } from '../models/customer';
import { infocountry } from '../models/infocountry';
import { visit } from '../models/visit';
import { salesrepresentative} from 'src/app/models/salesrepre';
import { visitbycity } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  constructor(private http: HttpClient) { }

  GetCountry(){
    return this
      .http.get<infocountry>(`${environment.apiURL}${Endpoint.GetAllCountrys}`)
      .pipe(map(data => data));
  }

  CreateClient(_customer: customer){    
    return this
      .http.post<response>(`${environment.apiURL}${Endpoint.CreateClient}`, _customer)
      .pipe(map(data => data));
  }

  ModifyClient(_customer: customer){    
    return this
      .http.post<response>(`${environment.apiURL}${Endpoint.ModifyClient}`, _customer)
      .pipe(map(data => data));
  }

  GetallClients(){
    return this
    .http.get<Array<customer>>(`${environment.apiURL}${Endpoint.GetAllClients}`)
    .pipe(map(data => data));
  }

  GetallSalesRepresentative(){
    return this
    .http.get<Array<salesrepresentative>>(`${environment.apiURL}${Endpoint.GetAllSalesRepr}`)
    .pipe(map(data => data));
  }

  Createvisit(_visit: visit){    
    return this
      .http.post<response>(`${environment.apiURL}${Endpoint.CreateVisit}`, _visit)
      .pipe(map(data => data));
  }

  GetAllvisit(IdClient: number){    
    return this
      .http.get<Array<visit>>(`${environment.apiURL}${Endpoint.GetAllvisit}${IdClient}`)
      .pipe(map(data => data));
  }

  DeleteClient(IdClient: number){    
    return this
      .http.get<response>(`${environment.apiURL}${Endpoint.DeleteClient}${IdClient}`)
      .pipe(map(data => data));
  }

  GetvisitsByCity(){    
    return this
      .http.get<Array<visitbycity>>(`${environment.apiURL}${Endpoint.GetAllVisitsByCity}`)
      .pipe(map(data => data));
  }

  


}
