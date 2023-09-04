import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '../../models/storage.model'

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
    console.log(`http://localhost:3000/storage/${id}`);
    console.log('id:'+ id);
    
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`
    });
    return this.httpClient.get<Storage>(`http://localhost:3000/storage/${id}`,{headers})
  }
}
