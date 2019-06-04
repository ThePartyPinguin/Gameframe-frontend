import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import * as Sockjs from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private serverUrl : string;
  private title : string;
  private stompClient;


  constructor() {
    this.serverUrl = environment.socketServerUrl;
    this.title = "Test title";
  }

  get socketClient(){
    return this.stompClient;
  }

  initSocketConnection(){
    // let ws = new Sockjs(this.serverUrl + "/socket/connect");
    // this.stompClient = Stomp.over(ws);
    // let that = this;
    // this.stompClient.connect({}, (frame) => this.onConnected(frame), this.onError())
  }

  onConnected(frame){
    this.stompClient.subscribe("/topic/reply", (response) => {
      console.log(response.body)
    });
    //
    this.stompClient.send("/app/message", {}, JSON.stringify({payload : "Hello"}));
  }

  onError(){

  }


  sendMessage(url : string, message){

    let data = JSON.stringify({
      payload : "joris"
    });

    this.stompClient.send("/app/message", {}, data)
  }


}
