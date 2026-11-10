import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskCreatePayload, TaskItem, TaskUpdatePayload } from '../models/task.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskApi {
  private readonly http = inject(HttpClient);
  private readonly endpoint = "/tasks"

  getTasks() : Observable<TaskItem[]>{
    return this.http.get<TaskItem[]>(this.endpoint);
  }

  createTask(payload: TaskCreatePayload) : Observable<TaskItem>{
    return this.http.post<TaskItem>(this.endpoint, payload);
  }

  updateTask(id: number, payload: TaskUpdatePayload) : Observable<TaskItem>{
    return this.http.patch<TaskItem>(`${this.endpoint}/${id}`, payload);
  }

  deleteTask(id:number): Observable<void>{
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
