import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http : HttpClient) { }

  uploadNewProfileAvatar(fileData){

    const formData : FormData = new FormData();

    formData.append('file', fileData);

    return this.http.post(environment.apiUrl + "/files/upload/profilepicture", formData, {observe : 'response'});
  }
}
