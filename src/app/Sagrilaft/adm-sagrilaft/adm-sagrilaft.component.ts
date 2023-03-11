import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import * as $ from 'jquery';
import { GraphService } from 'src/app/service/graph.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SocialAuthService } from 'angularx-social-login';
import { AuthMicrosoftService } from 'src/app/service/auth-microsoft.service';
import { GeneralStatusService } from 'src/app/service/general-status.service';

@Component({
  selector: 'app-adm-sagrilaft',
  templateUrl: './adm-sagrilaft.component.html',
  styleUrls: ['./adm-sagrilaft.component.scss']
})

export class AdmSagrilaftComponent implements OnInit {
  @HostListener('document:click', ['$event']) onDocumentClick() {
    if ($('.session-card').css('display') == 'block') {
      $(".session-card").toggleClass("display");
    }
  }

  name: string;
  email: string;
  photoUrl: any;

  storageGoogle: any;
  storageMicrosoft: any;

  canCreate: boolean = false;
  canUpdate: boolean = false;

  isInitialDataComplete: boolean;
  isAssociatesComplete: boolean;
  isFinancialInformationComplete: boolean;
  isMoneyLaunderingComplete: boolean;
  isStatementsComplete: boolean;
  isDocumentUploadComplete: boolean;
  allStatus: {};

  constructor(
    private router: Router,
    private graphService: GraphService,
    private sanitizer: DomSanitizer,
    private authGoogle: SocialAuthService,
    public authMicrosoftService: AuthMicrosoftService,
    private generalStatusService: GeneralStatusService,
  ) { }

  ngOnInit(): void {
    // this.getPhotoMicrosoft();
    this.storageGoogle = localStorage.getItem('google_auth');
    this.storageMicrosoft = localStorage.getItem('Token');

    if (this.storageGoogle) {
      const dataGoogle = JSON.parse(this.storageGoogle);
      this.name = dataGoogle.name;
      this.email = dataGoogle.email;
      this.photoUrl = dataGoogle.photoUrl;
    } else if (this.storageMicrosoft) {
      let decoded: any = jwt_decode(this.storageMicrosoft);
      this.name = decoded.names;
      this.email = decoded.email;
      this.photoUrl = this.getPhotoMicrosoft();
    } else {
      this.signOut();
    }

    this.toggleTypeRequest(localStorage.getItem('Token'));

    this.generalStatusService.currentInitialDataStatus.subscribe(isComplete => {
      this.isInitialDataComplete = isComplete;
    });


    this.generalStatusService.currentAssociatesStatus.subscribe(isComplete => {
      this.isAssociatesComplete = isComplete;
    });


    this.generalStatusService.currentFinancialInformationStatus.subscribe(isComplete => {
      this.isFinancialInformationComplete = isComplete;
    });


    this.generalStatusService.currentMoneyLaunderingStatus.subscribe(isComplete => {
      this.isMoneyLaunderingComplete = isComplete;
    });


    this.generalStatusService.currentStatementsStatus.subscribe(isComplete => {
      this.isStatementsComplete = isComplete;
    });


    this.generalStatusService.currentDocumentUploadStatus.subscribe(isComplete => {
      this.isDocumentUploadComplete = isComplete;
    });

    this.generalStatusService.currentItemStatusObj.subscribe(obj => {
      this.allStatus = obj;
    });
  }

  openSessionCard(event) {
    event.stopPropagation();
    $(".session-card").toggleClass("display");
  }

  async getPhotoMicrosoft() {
    const photo = await this.graphService.getPhoto();
    const unsafeImageUrl = URL.createObjectURL(photo);
    this.photoUrl = this.sanitizer.bypassSecurityTrustUrl(unsafeImageUrl);
  }

  signOut(): void {
    if (this.storageGoogle) {
      this.authGoogle.signOut();
      localStorage.removeItem('Token');
      localStorage.removeItem('google_auth');
      this.router.navigateByUrl('/pages/login');
    } else {
      this.authMicrosoftService.signOut();
      localStorage.removeItem('Token');
      this.router.navigateByUrl('/pages/login');
    }
  }

  toggleTypeRequest(token) {
    let decoded: any = jwt_decode(token);
    let scopes = JSON.parse(decoded.scopes);

    scopes.forEach(element => {
      if (element.scope === 'create:customer') {
        this.canCreate = true;
        this.canUpdate = false;
      } else if (element.scope === 'update:customer') {
        this.canUpdate = true;
        this.canCreate = false;
      }
    });
  }
}
