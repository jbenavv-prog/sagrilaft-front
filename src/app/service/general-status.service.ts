import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneralStatusService {

  private itemStatusObj = new BehaviorSubject({});
  currentItemStatusObj = this.itemStatusObj.asObservable();

  private isInitialDataComplete = new BehaviorSubject(false);
  currentInitialDataStatus = this.isInitialDataComplete.asObservable();

  private isAssociatesComplete = new BehaviorSubject(false);
  currentAssociatesStatus = this.isAssociatesComplete.asObservable();

  private isFinancialInformationComplete = new BehaviorSubject(false);
  currentFinancialInformationStatus = this.isFinancialInformationComplete.asObservable();

  private isMoneyLaunderingComplete = new BehaviorSubject(false);
  currentMoneyLaunderingStatus = this.isMoneyLaunderingComplete.asObservable();

  private isStatementsComplete = new BehaviorSubject(false);
  currentStatementsStatus = this.isStatementsComplete.asObservable();

  private isDocumentUploadComplete = new BehaviorSubject(false);
  currentDocumentUploadStatus = this.isDocumentUploadComplete.asObservable();

  constructor() { }
  updateInitialDataStatus(isComplete: boolean) {
    this.isInitialDataComplete.next(isComplete);
    this.itemStatusObj.next(Object.assign(this.currentItemStatusObj, { initialDataStatus: isComplete }));
  }

  updateAssociatesStatus(isComplete: boolean) {
    this.isAssociatesComplete.next(isComplete);
    this.itemStatusObj.next(Object.assign(this.currentItemStatusObj, { associatesStatus: isComplete }));
  }

  updateFinancialInformationStatus(isComplete: boolean) {
    this.isFinancialInformationComplete.next(isComplete);
    this.itemStatusObj.next(Object.assign(this.currentItemStatusObj, { financialInformationStatus: isComplete }));
  }

  updateMoneyLaunderingStatus(isComplete: boolean) {
    this.isMoneyLaunderingComplete.next(isComplete);
    this.itemStatusObj.next(Object.assign(this.currentItemStatusObj, { moneyLaunderingStatus: isComplete }));
  }

  updateStatementsStatus(isComplete: boolean) {
    this.isStatementsComplete.next(isComplete);
    this.itemStatusObj.next(Object.assign(this.currentItemStatusObj, { statementsStatus: isComplete }));
  }

  updateDocumentUploadStatus(isComplete: boolean) {
    this.isDocumentUploadComplete.next(isComplete);
    this.itemStatusObj.next(Object.assign(this.currentItemStatusObj, { documentUploadStatus: isComplete }));
  }
}
