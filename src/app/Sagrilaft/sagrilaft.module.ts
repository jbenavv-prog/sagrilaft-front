import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SagrilaftRoutingModule } from './sagrilaft-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { InitialDataComponent } from './components/initial-data/initial-data.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssociatesComponent } from './components/associates/associates.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FinancialInformationComponent } from './components/financial-information/financial-information.component';
import { MoneyLaunderingComponent } from './components/money-laundering/money-laundering.component';
import { StatementsComponent } from './components/statements/statements.component';
import { DocumentUploadComponent } from './components/document-upload/document-upload.component';
import { AdmSagrilaftComponent } from './adm-sagrilaft/adm-sagrilaft.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatChipsModule} from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AdmSagrilaftComponent,
    InitialDataComponent,
    AssociatesComponent,
    FinancialInformationComponent,
    MoneyLaunderingComponent,
    StatementsComponent,
    DocumentUploadComponent,
  ],
  imports: [
    CommonModule,
    SagrilaftRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatTabsModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatRadioModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatChipsModule,
    MatAutocompleteModule,
  ],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' },
  ]
})
export class SagrilaftModule { }
