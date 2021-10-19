import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { CovidService } from 'src/app/services/covid.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';


registerLocaleData(localeFr);

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
})
export class DetailComponent implements OnInit {

  public dataTimeline = []
  public country = "";
  public completeData = [];
  public dataTemp = []
  public dataBackup = []

  public iso2Code;
  public date = "";

  public ascendente: boolean = true

  constructor(private _covidService: CovidService, private activatedRoute: ActivatedRoute, private datePipe: DatePipe) {

  }

  ngOnInit() {
    this.iso2Code = this.activatedRoute.snapshot.params.iso2Code;
    this.getTimelapseByCountryIso2Code();
  }

  orderByDateAsc(status) {
    if (status == true) {
      this.ascendente = false
      this.completeData.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
    });
    } else {
      this.ascendente = true
      this.completeData.sort(function(a, b) {
        a = new Date(a.date);
        b = new Date(b.date);
        return b>a ? -1 : b<a ? 1 : 0;
    });
    }
  }

  dateChange(event) {


    if (event != null) {
      let dateParsed = this.datePipe.transform(event, "M/dd/YY")
      this.dataBackup = this.completeData;

      this.dataTemp = this.completeData.filter(m => m.date == dateParsed);
      this.completeData = this.dataTemp;

    } else {
      this.completeData = this.dataBackup;
    }
  }

  getTimelapseByCountryIso2Code() {
    this._covidService.getTimelineByCountryIso2Code(this.iso2Code).subscribe(
      response => {
        this.country = response[0].countryregion;

        let timeSeriesInfoParsed = Object.values(response[0].timeseries);
        let timeSeriesDateParsed = Object.keys(response[0].timeseries)
        this.completeData = [];

        for (let x = 0; x < timeSeriesDateParsed.length; x++) {
        // for (let x = 0; x < 10; x++) {

          this.completeData.push({ "date": timeSeriesDateParsed[x], "confirmed": timeSeriesInfoParsed[x]["confirmed"], "deaths": timeSeriesInfoParsed[x]["deaths"], "recovered": timeSeriesInfoParsed[x]["recovered"] })
        }
      },
      error => {
        //Notificacion del error
        console.log(error);

      }
    )
  }

}
