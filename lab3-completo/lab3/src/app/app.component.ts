import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  components: any = [];
  serviceURL: string = 'http://localhost:3000/posts';
  component!: {
    id?: number;
    name: string;
    description: string;
    ManufactureDate: any;
    PartNum: number;
    comments: string;
  };
  update = false;
  idToSave: any = '';
  constructor (public http: HttpClient) {
    this.component = {
      name: '',
      description: '',
      ManufactureDate: '',
      PartNum: 0,
      comments: ''
    };
  }

  ngOnInit () {
    this.get();
  }

  show(item : any) {
    this.component = {...item};
    this.component.id = item.id;
    this.update = true;
  }

  save () {
    if (!this.update) {
      this.post();
    } else  {
      this.put();
    }
  }

  put () {
    this.http.put<any>('http://localhost:3000/posts/' + this.component.id, this.component).subscribe(data => {
      console.log('PUT-REQUEST', data);
      delete this.component.id;
      this.component = {
        name: '',
        description: '',
        ManufactureDate: '',
        PartNum: 0,
        comments: ''
      };
      this.get();
    })
  }

  delete (item: any) {
    this.http.delete<any>('http://localhost:3000/posts/' + item.id).subscribe(data => {
      console.log('PUT-REQUEST', data);
      delete this.component.id;
      this.component = {
        name: '',
        description: '',
        ManufactureDate: '',
        PartNum: 0,
        comments: ''
      };
      this.get();
    })
  }


  post () {
    this.http.post<any>('http://localhost:3000/posts', this.component).subscribe(data => {
      console.log('POST-REQUEST', data);
      this.component = {
        name: '',
        description: '',
        ManufactureDate: '',
        PartNum: 0,
        comments: ''
      };
      this.get();
    })
  }

  get () {
    this.http.get<any>(this.serviceURL, { }).subscribe(data => {
      console.log('POST-REQUEST', data);
      this.components = data;
    })
  }

}
