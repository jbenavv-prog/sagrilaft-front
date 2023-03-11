import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { SagrilaftService } from 'src/app/service/sagrilaft.service';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';
import { GeneralStatusService } from 'src/app/service/general-status.service';

@Component({
  selector: 'app-money-laundering',
  templateUrl: './money-laundering.component.html',
  styleUrls: ['./money-laundering.component.scss']
})
export class MoneyLaunderingComponent implements OnInit {

  constructor(
    private sagrilaftService: SagrilaftService,
    private fb: FormBuilder,
    private generalStatusService: GeneralStatusService,
  ) { }

  @Input() allStatus: any;

  form = this.fb.group({
    guarded: ['', Validators.required],
    preventionSystem: ['', Validators.required],
    otherPreventionSystem: ['', Validators.nullValidator],
    surnames: ['', Validators.required],
    names: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required]
  });

  account: any

  ngOnInit(): void {
    const token = localStorage.getItem('Token');
    let decoded: any = jwt_decode(token);
    this.account = decoded;

    this.preventionSystem.valueChanges.subscribe(checked => {
      if (checked == 'other') {
        this.otherPreventionSystem.setValidators([Validators.required]);
      } else {
        this.otherPreventionSystem.setValidators(null);
      }
      this.otherPreventionSystem.updateValueAndValidity();
    });

    this.toggleTypeRequest(token);
  }

  get preventionSystem() {
    return this.form.get('preventionSystem') as FormControl;
  }

  get otherPreventionSystem() {
    return this.form.get('otherPreventionSystem') as FormControl;
  }

  onSubmit() {

    if (this.form.valid) {
      const account = this.account
      const formData = this.form.value
      const request = {
        account,
        formData
      }

      this.sagrilaftService.createMoneyLaundery(request)
        .subscribe(response => {
          if (response.ok) {
            this.generalStatusService.updateMoneyLaunderingStatus(true);

            const st = this.allStatus;
            if (st.initialDataStatus && st.associatesStatus && st.financialInformationStatus && st.moneyLaunderingStatus && st.statementsStatus && st.documentUploadStatus) {
              console.log('Sending Message from Money Laundering');
            }

            swal({
              title: "Ok",
              text: response.message,
              icon: "success",
            })
          } else {
            swal({
              title: "Error",
              text: response.message,
              icon: "error",
            });
          }
        })

    } else {
      swal({
        title: "Error!",
        text: 'Faltan Campos',
        icon: "error",
      });
    }
  }

  toggleTypeRequest(token) {
    let decoded: any = jwt_decode(token);
    this.account = decoded;
    let scopes = JSON.parse(decoded.scopes);

    scopes.forEach(element => {
      if (element.scope === 'create:customer') {
      } else if (element.scope === 'update:customer') {
        this.fillData(decoded);
      }
    });
  }

  fillData(account: any) {
    const request = {
      account
    }

    this.sagrilaftService.getMoneyLaundery(request).subscribe(response => {
      if (response.ok) {
        this.generalStatusService.updateMoneyLaunderingStatus(Object.keys(response.data).length > 0 ? true : false);
        this.form.patchValue(response.data);
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
