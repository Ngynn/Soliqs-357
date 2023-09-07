import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '../../models/storage.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private httpClient: HttpClient) {}

  create(file: File, fileName: string, idToken: string) {
    const formData = new FormData();
    formData.append('files', file);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });

    return this.httpClient.post(
      environment.hostingURL + `/storage/upload?folderName=${fileName}`,
      formData,
      { headers }
    );
  }

  getStorage(fileName: string, idToken: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${idToken}`,
    });

    return this.httpClient.get<Storage>(
      environment.hostingURL + `/storage?folderName=${fileName}`,
      {
        headers,
      }
    );
  }
}
