import { Component, Input, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { GeneralStatusService } from 'src/app/service/general-status.service';
import { SagrilaftService } from 'src/app/service/sagrilaft.service';
import swal from 'sweetalert';

const COLUMNS_SCHEMA = [
  {
    key: 'isSelected',
    type: 'isSelected',
    label: '',
  },
  {
    key: 'documentType',
    type: 'dropdown',
    label: 'Tipo Documento',
  },
  {
    key: 'documentNumber',
    type: 'number',
    label: 'Número Documento',
  },
  {
    key: 'names',
    type: 'text',
    label: 'Nombres',
  },
  {
    key: 'surname',
    type: 'text',
    label: 'Primer Apellido',
  },
  {
    key: 'secondSurname',
    type: 'text',
    label: 'Segundo Apellido',
  },
  {
    key: 'percent',
    type: 'text',
    label: '% Participación en el capital social',
  },
  {
    key: 'nationality',
    type: 'text',
    label: 'Nacionalidad',
  },
  {
    key: 'pep',
    type: 'checkbox',
    label: 'PEP',
  },
  {
    key: 'typePep',
    type: 'text',
    label: 'Cargo PEP',
  },
  {
    key: 'isEdit',
    type: 'isEdit',
    label: '',
  },
];

@Component({
  selector: 'app-associates',
  templateUrl: './associates.component.html',
  styleUrls: ['./associates.component.scss']
})
export class AssociatesComponent implements OnInit {

  constructor(
    private sagrilaftService: SagrilaftService,
    private generalStatusService: GeneralStatusService,
  ) { }

  @Input() allStatus: any;

  account: any;

  displayedColumns: string[] = COLUMNS_SCHEMA.map((col) => col.key);
  dataSource: any = [];
  columnsSchema: any = COLUMNS_SCHEMA;

  ngOnInit(): void {
    const token = localStorage.getItem('Token');
    let decoded: any = jwt_decode(token);
    this.account = decoded;
    this.toggleTypeRequest(token);
  }

  onSubmit() {

    if (this.dataSource.length > 0) {
      const account = this.account;
      const dataTable = this.dataSource;
      const request = {
        account,
        dataTable
      }

      this.sagrilaftService.createAssociates(request)
        .subscribe(response => {
          if (response.ok) {
            this.generalStatusService.updateAssociatesStatus(true);

            const st = this.allStatus;
            if (st.initialDataStatus && st.associatesStatus && st.financialInformationStatus && st.moneyLaunderingStatus && st.statementsStatus && st.documentUploadStatus) {
              console.log('Sending Message from Associates');
            }

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


        }, (err) => {
          swal({
            title: "Error!",
            text: err.status,
            icon: "error",
          });
        })

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

    this.sagrilaftService.getAssociates(request).subscribe(response => {
      if (response.ok) {
        this.dataSource = response.data.GpoAsociados ? JSON.parse(response.data.GpoAsociados) : [];
        this.generalStatusService.updateAssociatesStatus(response.data.GpoAsociados ? true : false);

      } else {
        swal({
          title: "Error!",
          text: response.message,
          icon: "error",
        });
      }
    });
  }

  addRow() {
    const newRow = {
      id: Date.now(),
      documentType: '',
      documentNumber: '',
      names: '',
      surname: '',
      secondSurname: '',
      percent: '',
      nationality: '',
      pep: false,
      typePep: '',
      isEdit: true
    };

    this.dataSource = [newRow, ...this.dataSource];
  }

  removeRow(id) {
    this.dataSource = this.dataSource.filter((u) => u.id !== id);
  }
}
