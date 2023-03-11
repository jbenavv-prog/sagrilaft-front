import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SagrilaftService } from 'src/app/service/sagrilaft.service';
import jwt_decode from 'jwt-decode';
import swal from 'sweetalert';
import { GeneralStatusService } from 'src/app/service/general-status.service';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.scss']
})
export class DocumentUploadComponent implements OnInit {

  constructor(
    private sagrilaftService: SagrilaftService,
    private fb: FormBuilder,
    private generalStatusService: GeneralStatusService,
  ) { }

  @Input() allStatus: any;

  form = this.fb.group({
    certfExist: [''],
    identDoc: [''],
    taxReg: [''],
    financialStatements: [''],
    beneficiaries: [''],
    name: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required]
  });

  canCreate: boolean;
  canUpdate: boolean;
  account: any
  docsURL: any;
  isLoading: boolean = false;

  ngOnInit(): void {
    const token = localStorage.getItem('Token');
    this.toggleTypeRequest(token);
  }

  handleFileInput(e) {
    const event = (e.target as HTMLInputElement);
    const file = event.files[0];
    const id = event.id;

    this.form.patchValue({
      [id]: file
    });

    this.form.get(id).updateValueAndValidity();
  }

  onSubmit() {

    if (this.form.valid) {

      const account = this.account;
      const formData = new FormData();
      this.isLoading = true;

      Object.keys(this.form.controls).forEach(key => {
        formData.append(key, this.form.get(key).value);
      });

      this.sagrilaftService.insertDocuments(formData, account)
        .subscribe(response => {
          if (response.ok) {
            this.generalStatusService.updateDocumentUploadStatus(true);

            const st = this.allStatus;
            if (st.initialDataStatus && st.associatesStatus && st.financialInformationStatus && st.moneyLaunderingStatus && st.statementsStatus && st.documentUploadStatus) {
              console.log('Sending Message from Document Upload');
            }

            this.isLoading = false;
            this.form.patchValue(response.data);
            this.docsURL = response.data;
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
        this.canCreate = true;
        this.canUpdate = false;
      } else if (element.scope === 'update:customer') {
        this.canUpdate = true;
        this.canCreate = false;
        this.fillData(decoded);
      }
    });
  }

  fillData(account: any) {
    const request = {
      account
    }

    this.sagrilaftService.getDocuments(request).subscribe(response => {
      if (response.ok) {
        this.generalStatusService.updateDocumentUploadStatus(Object.keys(response.data).length > 0  ? true : false);
        this.form.patchValue(response.data);
        this.docsURL = response.data;
      } else {
        swal({
          title: "Error!",
          text: response.message,
          icon: "error",
        });
      }
    });
  }

  openDoc(e) {
    const event = (e.target as HTMLInputElement);
    const id = event.id;

    window.open(
      `${this.docsURL[id]}`, '_blank');
  }
}

