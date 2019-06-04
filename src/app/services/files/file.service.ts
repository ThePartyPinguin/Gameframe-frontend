import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http : HttpClient) { }

  uploadNewProfileAvatar(fileData){
    console.log(fileData);

    const formData : FormData = new FormData();

    formData.append('file', fileData);
    console.log(formData);

    return this.http.post(environment.apiUrl + "/files/upload/profilepicture", formData, {observe : 'response'});
  }
}
