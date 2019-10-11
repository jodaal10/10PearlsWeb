import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataApiService } from 'src/app/services/data-api.service';
import { country} from 'src/app/models/country';
import { state} from 'src/app/models/state';
import { city} from 'src/app/models/city';
import { customer} from 'src/app/models/customer';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  ClientForm: FormGroup;
  availableCredit: number;
  submitted = false; 
  countries: country[] = new Array();
  states: state[] = new Array<state>();
  cities: city[] = new Array<city>();
  citiesname: city[] = new Array<city>();
  statesBd: state[] = new Array<state>();
  citiesBD: city[] = new Array<city>();
  customer: customer = new customer();
  customers: customer[] = new Array<customer>();
  searchString: string;
  modify: boolean = false;
  nitvisit: string; idclientvisit: number; visitspercen: number; creditAvilable: number;
  
  constructor(private formBuilder: FormBuilder,private _DataService: DataApiService) { }

  //Load the lists for the dropdown
  Loadlist(){
    return this._DataService.GetCountry()
      .subscribe(data =>{
        if (data != null){
            this.countries = data.countries;
            this.statesBd = data.states;
            this.citiesBD = data.cities;
            this.citiesname = data.cities;
            this.GetAllClients();
        }
      },
      error => {
        console.log(error)
        alert("Error please contact the adminstrator!!")
      }
      );
  }

  LoadVisit(customer){
    this.nitvisit = customer.nit;
    this.idclientvisit = customer.idClient;
    this.visitspercen = customer.visitsPercentage;
    this.creditAvilable = customer.availableCredit;
  }
  // Choose Country using select dropdown
  changeCountry(count) {
    var id = count.split(':');
    this.ClientForm.controls.City.setValue("");
    this.ClientForm.controls.State.setValue("");
    this.states = this.statesBd.filter((statesBd) => {
      return statesBd.idCountry == Number(id[1])
      });
  }

  // Choose Country using select dropdown
  changeState(count) {
    var id = count.split(':');
    this.ClientForm.controls.City.setValue("");
    this.cities = this.citiesBD.filter((citiesBD) => {
      return citiesBD.idState == Number(id[1])
      });
  }

  //New client
  CreateClient(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.ClientForm.invalid) {return;}

    this.customer.nit = this.ClientForm.controls.Nit.value;
    this.customer.fullname = this.ClientForm.controls.Fullname.value;
    this.customer.address = this.ClientForm.controls.Address.value;
    this.customer.phone = this.ClientForm.controls.Phone.value;
    this.customer.idCity = this.ClientForm.controls.City.value;
    this.customer.creditlimit = this.ClientForm.controls.Credit.value;
    this.customer.availablecredit = this.ClientForm.controls.Credit.value;
    this.customer.visitspercentage = this.ClientForm.controls.VisitsP.value;

    this._DataService.CreateClient(this.customer)
        .subscribe(data =>{
          if (data != null){
            if(data.response){
              alert('Success!!');
              //search
              this.GetAllClients();
            }else{
              alert('Error!!');
              console.log(data.message);
              //search
              this.GetAllClients();
            }
          }
        },
          error => {
          console.log(error);
          alert('Error please contact the adminstrator');
        }
        );
  }

  //Get All clients
  GetAllClients(){
    this._DataService.GetallClients()
    .subscribe(data =>{
      if (data != null &&data.length > 0 ){
        if(data){
          this.customers = data;
          this.customers.forEach(element => {
            var query = this.citiesBD.filter((citiesBD) => {
                return citiesBD.idCity == Number(element.idCity)
                });
            element.namecity = query[0].name;
          });
        }
      }
    },
      error => {
      console.log(error);
      alert('Error please contact the adminsitrator');
    }
    );
  }

  //Modify Client
  LoadCustomer(customer){
    this.ClientForm.controls.IdClient.setValue(customer.idClient);
    this.ClientForm.controls.Nit.setValue(customer.nit);
    this.ClientForm.controls.Fullname.setValue(customer.fullName);
    this.ClientForm.controls.Address.setValue(customer.address);
    this.ClientForm.controls.Phone.setValue(customer.phone);
    this.cities = this.citiesBD;
    this.ClientForm.controls.City.setValue(customer.idCity);
    this.ClientForm.controls.Credit.setValue(customer.creditLimit);
    this.ClientForm.controls.VisitsP.setValue(customer.visitsPercentage);
    this.availableCredit = customer.availableCredit;
    this.modify = true;
  }

  //Modify Client
  ModifyCustomer(customer){
    this.submitted = true;
    // stop here if form is invalid
    if (this.ClientForm.invalid) {return;}

    this.customer.idclient = this.ClientForm.controls.IdClient.value;
    this.customer.nit = this.ClientForm.controls.Nit.value;
    this.customer.fullname = this.ClientForm.controls.Fullname.value;
    this.customer.address = this.ClientForm.controls.Address.value;
    this.customer.phone = this.ClientForm.controls.Phone.value;
    this.customer.idCity = this.ClientForm.controls.City.value;
    this.customer.creditlimit = this.ClientForm.controls.Credit.value;
    this.customer.availablecredit = this.availableCredit;
    this.customer.visitspercentage = this.ClientForm.controls.VisitsP.value;

    this._DataService.ModifyClient(this.customer)
        .subscribe(data =>{
          debugger;
          if (data != null){
            if(data.response){
              alert('Success!!');
              //search
              this.GetAllClients();
            }else{
              alert('Error!!');
              console.log(data.message);
              //search
              this.GetAllClients();
            }
          }
        },
          error => {
          console.log(error);
          alert('Error please contact the adminstrator');
        }
        );
  }

  DeleteCustomer(idclient: number){
    if(confirm("Are you sure to delete client?")) {
      this._DataService.DeleteClient(idclient)
      .subscribe(data =>{
        if (data != null){
          if(data.response){
            alert('Success!!');
            //search
            this.GetAllClients();
          }else{
            alert('Error!!');
            console.log(data.message);
          }
        }
      },
        error => {
        console.log(error);
        alert('Error please contact the adminstrator');
      }
      );
    }
  }

//initialize
  ngOnInit() {
    this.ClientForm = this.formBuilder.group({
      Nit: ['', Validators.required],
      Fullname: ['', Validators.required],
      Address: ['', Validators.required],
      Phone: ['', Validators.required],
      Credit: ['', Validators.required],
      VisitsP: ['', Validators.required],
      City: ['', Validators.required],
      State: ['', Validators.required],
      Country: ['', Validators.required],
      IdClient:['']
    });

    this.Loadlist();
  }

  setId(){}
  get f() { return this.ClientForm.controls; }
  

}

