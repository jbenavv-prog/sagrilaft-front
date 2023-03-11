import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Form, FormBuilder, FormControl, FormControlName, Validators } from '@angular/forms';
import { CitiesService } from 'src/app/service/cities.service';
import { SagrilaftService } from 'src/app/service/sagrilaft.service';
import { MatDialog } from '@angular/material/dialog';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';
import { environment as env } from 'src/environments/environment';
import { EconomicActivitiesService } from 'src/app/service/economic-activities.service';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { map, startWith } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { GeneralStatusService } from 'src/app/service/general-status.service';




export interface InitDataDialog {
  title: string;
  text: string;
}

@Component({
  selector: 'app-initial-data',
  templateUrl: './initial-data.component.html',
  styleUrls: ['./initial-data.component.scss']
})

export class InitialDataComponent implements OnInit {
  constructor(
    private citiesService: CitiesService,
    private sagrilaftService: SagrilaftService,
    private economicActivitiesService: EconomicActivitiesService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private generalStatusService: GeneralStatusService,
  ) {
    this.filteredEconActivities = this.econActivityCtrl.valueChanges.pipe(
      startWith(null),
      map((econActivity: string | null) => econActivity ? this._filter(econActivity) : this.allEconActivities.slice()));
  }

  @Input() allStatus: any;

  form = this.fb.group({
    date: [{ value: new Date().toISOString(), disabled: true }, Validators.required],
    requestType: ['', Validators.required],
    businessName: ['', Validators.required],
    nit: ['', Validators.required],
    dv: ['', Validators.required],
    companyType: ['', Validators.required],
    econActivities: ['', Validators.required],
    contributorType: ['', Validators.required],
    otherContributorType: ['', Validators.nullValidator],
    isRen: ['', Validators.required],
    resolutionNumberR: ['', Validators.required],
    isGreatContributor: ['', Validators.required],
    resolutionNumberG: ['', Validators.required],
    isIndustryManager: ['', Validators.required],
    countryIndustryManager: ['', Validators.nullValidator],
    stateIndustryManager: ['', Validators.nullValidator],
    cityIndustryManager: ['', Validators.nullValidator],
    isIvaManager: ['', Validators.required],
    ivaTariff: ['', Validators.required],
    isElectrBill: ['', Validators.required],
    electrBillEmail: ['', [Validators.required, Validators.email]],
    isWebInvoice: ['', Validators.required],
    webInvoicePage: ['', Validators.required],
    contactPortfName: ['', Validators.required],
    contactPortfEmail: ['', [Validators.required, Validators.email]],
    contactCertName: ['', Validators.required],
    contactCertEmail: ['', [Validators.required, Validators.email]],
    commerceDate: ['', Validators.required],
    businessEmail: ['', [Validators.required, Validators.email]],
    mainAddress: ['', Validators.required],
    mainCountry: ['', Validators.required],
    mainState: ['', Validators.required],
    mainCity: ['', Validators.required],
    mainPhone: ['', Validators.required],
    branchAddress: ['', Validators.nullValidator],
    branchCountry: ['', Validators.nullValidator],
    branchState: ['', Validators.nullValidator],
    branchCity: ['', Validators.nullValidator],
    branchPhone: ['', Validators.nullValidator],
    legalName: ['', Validators.required],
    legalDocType: ['', Validators.required],
    legalDocNum: ['', Validators.required],
    pepLegal: [false, Validators.nullValidator],
    pepLegalFamily: [false, Validators.nullValidator],
    substName: ['', Validators.required],
    substDocType: ['', Validators.nullValidator],
    substDocNum: ['', Validators.nullValidator],
    pepSubst: [false, Validators.nullValidator],
    pepSubstFamily: [false, Validators.nullValidator],
  });

  stateArray: any = [];
  citiesArray: any = [];
  mainCountryArray: any = [];
  mainStateArray: any = [];
  mainCitiesArray: any = [];
  branchCountryArray: any = [];
  branchStateArray: any = [];
  branchCitiesArray: any = [];
  tokenApiCities: any;
  canCreate: boolean;
  canUpdate: boolean;
  account: any = {};
  documentTypes: string[] = ['Cédula de ciudadanía', 'Cédula de extranjería'];
  initialDataChecked: string;
  isLoading: boolean = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  econActivityCtrl = new FormControl();
  filteredEconActivities: Observable<string[]>;
  econActivitiesArray: any = [];
  allEconActivities: any = [];

  @ViewChild('economicActivityInput') econActivityInput: ElementRef;

  ngOnInit(): void {
    const token = localStorage.getItem('Token');
    this.toggleTypeRequest(token);

    this.economicActivitiesService.getEconomicActivities().subscribe(respuesta => {
      this.allEconActivities = respuesta;
    });

    this.contributorType.valueChanges.subscribe(checked => {
      if (checked == 'Otro') {
        this.otherContributorType.setValidators([Validators.required]);
      } else {
        this.otherContributorType.setValidators(null);
        this.otherContributorType.setValue('');
      }
      this.otherContributorType.updateValueAndValidity();
    });

    this.isRen.valueChanges.subscribe(checked => {
      if (checked) {
        this.resolutionNumberR.setValidators([Validators.required]);
      } else {
        this.resolutionNumberR.setValidators(null);
        this.resolutionNumberR.setValue('');
      }
      this.resolutionNumberR.updateValueAndValidity();
    });

    this.isGreatContributor.valueChanges.subscribe(checked => {
      if (checked) {
        this.resolutionNumberG.setValidators([Validators.required]);
      } else {
        this.resolutionNumberG.setValidators(null);
        this.resolutionNumberG.setValue('');
      }
      this.resolutionNumberG.updateValueAndValidity();
    });

    this.isIndustryManager.valueChanges.subscribe(checked => {
      if (checked) {
        this.cityIndustryManager.setValidators([Validators.required]);
      } else {
        this.cityIndustryManager.setValidators(null);
        this.cityIndustryManager.setValue('');
      }
      this.cityIndustryManager.updateValueAndValidity();
    });

    this.isIvaManager.valueChanges.subscribe(checked => {
      if (checked) {
        this.ivaTariff.setValidators([Validators.required]);
      } else {
        this.ivaTariff.setValidators(null);
        this.ivaTariff.setValue('');
      }
      this.ivaTariff.updateValueAndValidity();
    });


    this.isElectrBill.valueChanges.subscribe(checked => {
      if (checked) {
        this.electrBillEmail.setValidators([Validators.required]);
      } else {
        this.electrBillEmail.setValidators(null);
        this.electrBillEmail.setValue('');
      }
      this.electrBillEmail.updateValueAndValidity();
    });

    this.isWebInvoice.valueChanges.subscribe(checked => {
      if (checked) {
        this.webInvoicePage.setValidators([Validators.required]);
      } else {
        this.webInvoicePage.setValidators(null);
        this.webInvoicePage.setValue('');
      }
      this.webInvoicePage.updateValueAndValidity();
    });


    this.citiesService.getAccessToken(env.apiUrlToken, env.APITOKEN_CITIES_SAGRILAFT, env.EMAIL_CITIES_SAGRILAFT).subscribe((data) => {
      this.tokenApiCities = data;
      this.getCountries(data);
    });
  }

  get econActivities() {
    return this.form.get('econActivities') as FormControl;
  }

  get contributorType() {
    return this.form.get('contributorType') as FormControl;
  }

  get otherContributorType() {
    return this.form.get('otherContributorType') as FormControl;
  }

  get isRen() {
    return this.form.get('isRen') as FormControl;
  }

  get resolutionNumberR() {
    return this.form.get('resolutionNumberR') as FormControl;
  }

  get isGreatContributor() {
    return this.form.get('isGreatContributor') as FormControl;
  }

  get resolutionNumberG() {
    return this.form.get('resolutionNumberG') as FormControl;
  }

  get isIndustryManager() {
    return this.form.get('isIndustryManager') as FormControl;
  }

  get cityIndustryManager() {
    return this.form.get('cityIndustryManager') as FormControl;
  }

  get isIvaManager() {
    return this.form.get('isIvaManager') as FormControl;
  }

  get ivaTariff() {
    return this.form.get('ivaTariff') as FormControl;
  }

  get isElectrBill() {
    return this.form.get('isElectrBill') as FormControl;
  }

  get electrBillEmail() {
    return this.form.get('electrBillEmail') as FormControl;
  }

  get isWebInvoice() {
    return this.form.get('isWebInvoice') as FormControl;
  }

  get webInvoicePage() {
    return this.form.get('webInvoicePage') as FormControl;
  }

  onSubmit() {


    if (this.form.valid) {
      this.isLoading = true;

      const account = this.account;
      const formData = this.form.value;

      const request = {
        account,
        formData
      }

      if (this.canCreate) {
        this.sagrilaftService.createCustomer(request)
          .subscribe(response => {
            this.isLoading = false;
            if (response.ok) {
              this.generalStatusService.updateInitialDataStatus(true);

              const token = `Bearer ${response.token}`;
              localStorage.setItem('Token', token);

              swal({
                title: "Ok",
                text: response.message,
                icon: "success",
              }).then(() => {
                window.location.reload();
              });

            } else {
              swal({
                title: "Error",
                text: response.message,
                icon: "error",
              });
            }

          }, (err) => {
            swal({
              title: "Error!",
              text: err.status,
              icon: "error",
            });
          });
      } else if (this.canUpdate) {
        this.sagrilaftService.updateCustomer(request).subscribe(response => {
          this.isLoading = false;
          if (response.ok) {

            const st = this.allStatus;
            if (st.initialDataStatus && st.associatesStatus && st.financialInformationStatus && st.moneyLaunderingStatus && st.statementsStatus && st.documentUploadStatus) {
              this.sagrilaftService.sendConfirmationMail(request).subscribe(response => {
                console.log(response);
              });
            };

            swal({
              title: "Ok!",
              text: response.message,
              icon: "success",
            });
          } else {
            swal({
              title: "Error!",
              text: response.message,
              icon: "error",
            });
          }
        })
      } else {
        swal({
          title: "Error!",
          text: 'You do not have the necessary permissions',
          icon: "error",
        });
      }
    } else {
      swal({
        title: "Error!",
        text: 'Faltan Campos',
        icon: "error",
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) { }

    if (input) {
      input.value = '';
    }

    this.econActivityCtrl.setValue(null);
  }

  remove(economicActivity, indx): void {
    this.econActivitiesArray.splice(indx, 1);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if (!this.econActivitiesArray.includes(event.option.value)) {
      this.econActivitiesArray.push(event.option.value);
    }

    this.econActivityInput.nativeElement.value = '';
    this.econActivityCtrl.setValue(null);

    this.econActivities.setValue(JSON.stringify(this.econActivitiesArray));
  }

  private _filter(value: any): any[] {
    return this.allEconActivities.filter(econActivity => econActivity.displayView.toLowerCase().includes(value));
  }

  getCountries(tokenApiCities) {
    this.mainCountryArray = [];
    this.branchCountryArray = [];
    this.citiesService.getApiRequest(env.apiUrlCountries, tokenApiCities.auth_token).subscribe((data) => {
      data.forEach((item) => {
        this.mainCountryArray.push(item.country_name);
        this.branchCountryArray.push(item.country_name);
      });
    });
  }

  getStateByCountry(country: string, type: string, tokenApiCities) {
    const tokenV = tokenApiCities ? tokenApiCities : this.tokenApiCities;
    this.citiesService.getApiRequest(env.apiUrlStates + country, tokenV.auth_token).subscribe((data) => {

      switch (type) {
        case '':
          this.stateArray = [];
          data.forEach((item) => {
            this.stateArray.push(item.state_name);
          });
          break;
        case 'main':
          this.mainStateArray = [];
          data.forEach((item) => {
            this.mainStateArray.push(item.state_name);
          });
          break;
        case 'branch':
          this.branchStateArray = [];
          data.forEach((item) => {
            this.branchStateArray.push(item.state_name);
          });
          break;
      }
    });
  }

  getCityByState(state: string, type: string) {
    this.citiesService.getApiRequest(env.apiUrlCities + state, this.tokenApiCities.auth_token).subscribe((data) => {

      switch (type) {
        case '':
          this.citiesArray = [];
          data.forEach((item) => {
            this.citiesArray.push(item.city_name);
          });
          break;
        case 'main':
          this.mainCitiesArray = [];
          data.forEach((item) => {
            this.mainCitiesArray.push(item.city_name);
          });
          break;
        case 'branch':
          this.branchCitiesArray = [];
          data.forEach((item) => {
            this.branchCitiesArray.push(item.city_name);
          });
          break;
      }
    });
  }

  toggleTypeRequest(token) {
    let decoded: any = jwt_decode(token);
    this.account = decoded;
    let scopes = JSON.parse(decoded.scopes);

    scopes.forEach(element => {
      if (element.scope === 'create:customer') {
        this.canCreate = true;
        this.canUpdate = false;
        this.form.get('requestType').setValue('new');
      } else if (element.scope === 'update:customer') {
        this.canUpdate = true;
        this.canCreate = false;
        this.form.get('requestType').setValue('update');
        this.fillData(decoded);
      }
    });
  }

  fillData(account: any) {
    const request = {
      account
    }

    this.sagrilaftService.getInitialData(request).subscribe(response => {
      if (response.ok) {
        this.generalStatusService.updateInitialDataStatus(Object.keys(response.data).length > 0 ? true : false);
        this.form.patchValue(response.data);
        this.econActivitiesArray = JSON.parse(this.econActivities.value);
      } else {
        swal({
          title: "Error!",
          text: response.message,
          icon: "error",
        });
      }
    });
  }
}

