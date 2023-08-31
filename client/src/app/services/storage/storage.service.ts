import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {




  constructor(private httpClient: HttpClient) { }


  create( file: File,id: string, idToken: string) {
    const formData = new FormData();
    formData.append('files', file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`
    });

    return this.httpClient.post(
      `http://localhost:3000/storage/upload/${id}`,
      formData,
      { headers }
    );
  }


  getStorage(id: string, idToken: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`
    });
    return this.httpClient.get<Storage>(`localhost:3000/storage/${id}`,{headers})
  }
}
