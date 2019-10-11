import { Component, OnInit,ViewChild  } from '@angular/core';
import { DataApiService } from 'src/app/services/data-api.service';
import { visitbycity} from 'src/app/models/city';
import { city} from 'src/app/models/city';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  visitsbycity: visitbycity[] = new Array<visitbycity>();
  citiesBD : city[] = new Array<city>() ;
  datas = [['Loading...',0]];
    //title = 'Number of visits by city ';
  //type='PieChart';
  type = 'ComboChart';

  columnNames = ['City', 'Visits'];
  //options = { colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true};
   options = {   
     hAxis: {
       title: 'City'
     },
     vAxis:{
       title: 'Number of Visits'
     },
     seriesType: 'bars',
     series: {2: {type: 'line'}},
     is3D: true,
     //colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6']
   };
    width = 600;
    height = 400;

  constructor(private _DataService: DataApiService) { }

   //Load the lists for the dropdown
   Loadlist(){
    return this._DataService.GetCountry()
      .subscribe(data =>{
        if (data != null){
          debugger;
            this.citiesBD = data.cities;
            this.datas = null;
            this.datas = [];
            this.visitsbycity.forEach(visit => {
              this.citiesBD.forEach(city => {
                if(city.idCity == visit.idcity){
                  visit.namecity = city.name;
                  this.datas.push([visit.namecity,visit.totalvisits]);
                }
              });
            });
        }
      },
      error => {
        console.log(error)
        alert("Error please contact the adminstrator!!")
      }
      );
  }

    //Get visits by city
    GetVisitsbyCity(){
      this._DataService.GetvisitsByCity()
        .subscribe(data =>{
          if (data != null){
            this.visitsbycity = data;
            this. Loadlist();
          }
        },
          error => {
          console.log(error);
          alert('Error please contact the adminstrator');
        }
        );
    }


  ngOnInit() {
    this.GetVisitsbyCity();
  }

}
