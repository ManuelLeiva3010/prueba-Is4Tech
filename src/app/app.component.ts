import { Component, OnInit } from '@angular/core';
import { CovidService } from './services/covid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  title = 'covid';

  public openModal: boolean = false;
  public modalInfoSaved = false;
  public birthday;
  public name;
  public email;
  public formUser;

  constructor() { }

  ngOnInit() { }

  openModalFunction() {
    this.openModal = true
  }

  saveUser() {
    this.openModal = false
    this.modalInfoSaved = true;
  }

}
