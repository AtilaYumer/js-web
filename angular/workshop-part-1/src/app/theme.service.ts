import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs';
import { ITheme } from 'src/interfaces/theme.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  getThemes(): Observable<ITheme[]> {
    return this.http.get<ITheme[]>(`${environment.apiUrl}/themes`);
  }
}
