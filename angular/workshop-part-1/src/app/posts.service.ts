import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/interfaces/post.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  loadLastPosts(): Observable<IPost[]> {
    return this.http.get<IPost[]>(`${environment.apiUrl}/posts?limit=5`);
  }
}
