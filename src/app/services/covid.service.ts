import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidService {


  private headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) { }

  private url = "https://master-covid-19-api-laeyoung.endpoint.ainize.ai/"

  private countries = [
    {
      countryName: "Guatemala",
      iso2Code: "GT"
    },
    {
      countryName: "Belice",
      iso2Code: "BZ"
    },
    {
      countryName: "Salvador",
      iso2Code: "SV"
    },
    {
      countryName: "Honduras",
      iso2Code: "HN"
    },
    {
      countryName: "Nicaragua",
      iso2Code: "NI"
    },
    {
      countryName: "Costa Rica",
      iso2Code: "CR"
    },
    {
      countryName: "Panama",
      iso2Code: "PA"
    }
  ]

  getHome(): Observable<any> {
    return this.http.get(this.url, { headers: this.headers });
  }

  getTotalCases(): Observable<any> {
    return this.http.get(this.url + "jhu-edu/brief", { headers: this.headers });
  }

  getTimelineByCountryIso2Code(countryIso2Code): Observable<any> {
    return this.http.get(this.url + "jhu-edu/timeseries?iso2=" + countryIso2Code);
  }


  getResumeByCountry(countryIsoCode): Observable<any> {
    return this.http.get(this.url + "jhu-edu/latest?iso2=" + countryIsoCode);
  }

  getCentroamericanCountries() {
    return this.countries;
  }

}
