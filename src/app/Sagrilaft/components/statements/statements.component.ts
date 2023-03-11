import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SagrilaftService } from 'src/app/service/sagrilaft.service';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';
import { GeneralStatusService } from 'src/app/service/general-status.service';

@Component({
  selector: 'app-statements',
  templateUrl: './statements.component.html',
  styleUrls: ['./statements.component.scss']
})
export class StatementsComponent implements OnInit {


  constructor(
    private sagrilaftService: SagrilaftService,
    private fb: FormBuilder,
    private generalStatusService: GeneralStatusService,
  ) { }

  @Input() allStatus: any;

  form = this.fb.group({
    sourceFunds: ['', Validators.required],
    controlList: ['', Validators.nullValidator],
    authorizationClause: ['', Validators.nullValidator],
  });

  account: any

  ngOnInit(): void {
    const token = localStorage.getItem('Token');
    let decoded: any = jwt_decode(token);
    this.account = decoded;
    this.toggleTypeRequest(token);
  }

  onSubmit() {

    if (this.form.valid) {
      const account = this.account
      const formData = this.form.value
      const request = {
        account,
        formData
      }

      this.sagrilaftService.createStatements(request)
        .subscribe(response => {
          if (response.ok) {
            this.generalStatusService.updateStatementsStatus(true);

            const st = this.allStatus;
            if (st.initialDataStatus && st.associatesStatus && st.financialInformationStatus && st.moneyLaunderingStatus && st.statementsStatus && st.documentUploadStatus) {
              console.log('Sending Message from Statements');
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
        });

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

    this.sagrilaftService.getStatements(request).subscribe(response => {
      if (response.ok) {
        this.generalStatusService.updateStatementsStatus(Object.keys(response.data).length > 0  ? true : false);
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
