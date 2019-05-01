import {Component, inject, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input('loadingText')
  loadingText: string;

  constructor() { }

  ngOnInit() {
  }

}
