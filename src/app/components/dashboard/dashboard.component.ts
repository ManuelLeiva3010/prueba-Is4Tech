import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { CovidService } from 'src/app/services/covid.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(private _covidService: CovidService, private router: Router) { }



  public countries;
  public totalCases
  public countryResumeInfo: any[] = [];

  //Opciones para las graficas
  public single: any[] = [];

  view: any[] = [850, 500];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  legendTitle = false;
  showDataLabel = true;
  animations = true;
  yAxisLabel = '';
  xAxisLabel = '';

  colorScheme = {
    domain: ['#BC5090', '#FFA602', '#93E423']
  };

  onSelect(event) {
    console.log(event);
  }

  ngOnInit() {
    this.getCountries();
    this.getTotalCases();
    this.fillTotalCases();

  }

  ngAfterViewInit() {
    this.fillTotalCases();
  }

  fillTotalCases() {
    this.single.push({ "name": "Confirmados", "value": this.totalCases.confirmed }, { "name": "Fallecidos", "value": this.totalCases.deaths }, { "name": "Recuperados", "value": this.totalCases.recovered })
  }

  getCountries() {
    this.countries = this._covidService.getCentroamericanCountries();
  }

  getResumeByCountry(countryIsoCode) {
    this._covidService.getResumeByCountry(countryIsoCode).subscribe(
      async response => {
        this.countryResumeInfo = await []
        this.countryResumeInfo.push({ "name": "Confirmados", "value": response[0].confirmed }, { "name": "Fallecidos", "value": response[0].deaths }, { "name": "Recuperados", "value": response[0].recovered });
      },
      error => {
        console.log(error);
      }
    )
  }

  getTotalCases() {
    this._covidService.getTotalCases().subscribe(
      response => {
        this.totalCases = response
      },
      error => {
        console.log("NOTIFICACION CON EL ERROR");
      }
    )
  }

  getDetailByCountry(country) {
    this.router.navigateByUrl("detail/"+country.iso2Code)
  }
}
