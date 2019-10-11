import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import { salesrepresentative} from 'src/app/models/salesrepre';
import { visit } from 'src/app/models/visit';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.css']
})
export class VisitsComponent implements OnInit {
  @Input() Nit: number;
  @Input() Idclient: number;
  @Input() Percetage: number;
  @Input() CreditAvilable: number;
  @Output('refresh') refresh: EventEmitter<any> = new EventEmitter<any>();

  visitsForm: FormGroup;
  submitted = false; 
  Representatives: salesrepresentative[] = new Array<salesrepresentative>();
  visit: visit = new visit();
  Visits: visit[] = new Array<visit>();

  constructor(private formBuilder: FormBuilder,private _DataService: DataApiService) {}

  //Load the lists for the dropdown
  LoadRepresentative(){
    return this._DataService.GetallSalesRepresentative()
      .subscribe(data =>{
        if (data != null){
            this.Representatives = data;
        }
      },
      error => {
        console.log(error)
        alert("Error please contact the adminstrator")
      }
      );
  }

    //Load the visits register in data base
    LoadVisits(){
      return this._DataService.GetAllvisit(this.Idclient)
        .subscribe(data =>{
          if (data != null){
            debugger;
              this.Visits = data;
          }
        },
        error => {
          console.log(error)
          alert("Error please contact the adminstrator")
        }
        );
    }

 //Calculate visit total
  CalculateVist(net){
    let VisitT: any;
    VisitT = this.Percetage * this.visitsForm.controls.Net.value;
    this.visitsForm.controls.VisitTotal.setValue(VisitT);
  }

  //Register a new visit
  RegisterVisit(){
    this.submitted = true;
     // stop here if form is invalid
     if (this.visitsForm.invalid) {return;}

     if(this.CreditAvilable == 0){
      alert("Maximum amount reach");
      return;
     }

     this.visit.IdClient = this.Idclient;
     this.visit.IdSrepresentative = this.visitsForm.controls.IdRepresentative.value;
     this.visit.VisitDate = this.visitsForm.controls.VisitsDate.value;
     this.visit.Net = this.visitsForm.controls.Net.value;
     this.visit.VisitTotal = this.visitsForm.controls.VisitTotal.value;
     this.visit.Description = this.visitsForm.controls.Description.value;

     this._DataService.Createvisit(this.visit)
     .subscribe(data =>{
       if (data != null){
         if(data.response){
           alert('Success!!');
           this.refresh.emit();
         }else{
           alert('Error!!');
           console.log(data.message);
         }
         //search
           this.LoadVisits();
       }
     },
       error => {
       console.log(error);
       alert('Error please contact the adminstrator');
     }
     );
  }

  Clear(){
    this.visitsForm.controls.VisitsDate.setValue("");
    this.visitsForm.controls.IdRepresentative.setValue("");
    this.visitsForm.controls.Net.setValue("");
    this.visitsForm.controls.VisitTotal.setValue("");
    this.visitsForm.controls.Description.setValue(""); 
    this.submitted = false;
    this.Visits = null;
  }

  ngOnInit() {
    this.visitsForm = this.formBuilder.group({
      VisitsDate: ['', Validators.required],
      IdRepresentative: ['', Validators.required],
      Net: ['', Validators.required],
      VisitTotal: ['', Validators.required],
      Description: ['', Validators.required]
    });
    this.LoadRepresentative();
  }

  get f() { return this.visitsForm.controls; }

}
