import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userurl: string = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) {}
  getAllUsers(page: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.userurl}?page=${page}`);
    
}
getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${this.userurl}/${id}`);
}}
