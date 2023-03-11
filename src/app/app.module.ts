import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgReduxModule } from '@angular-redux/store';
import { NgRedux, DevToolsExtension } from '@angular-redux/store';
import { rootReducer, ArchitectUIState } from './ThemeOptions/store';
import { ConfigActions } from './ThemeOptions/store/config.actions';
import { AppRoutingModule } from './app-routing.module';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login'

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// BOOTSTRAP COMPONENTS

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LaddaModule } from 'angular2-ladda';
import { NgxLoadingModule } from 'ngx-loading';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { ToastrModule } from 'ngx-toastr';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CountUpModule } from 'countup.js-angular2';
import { AgmCoreModule } from '@agm/core';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { NouisliderModule } from 'ng2-nouislider';
import { NgSelectModule } from '@ng-select/ng-select';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TextMaskModule } from 'angular2-text-mask';
import { ClipboardModule } from 'ngx-clipboard';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';
import { ColorPickerModule } from 'ngx-color-picker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { ChartsModule } from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';
import { ModalModule } from 'ngx-bootstrap/modal';


// ANGULAR MATERIAL COMPONENTS

import { MatCheckboxModule } from '@angular/material/checkbox';

// LAYOUT

import { BaseLayoutComponent } from './Layout/base-layout/base-layout.component';
import { AppsLayoutComponent } from './Layout/apps-layout/apps-layout.component';
import { PagesLayoutComponent } from './Layout/pages-layout/pages-layout.component';
import { ThemeOptions } from './theme-options';
import { OptionsDrawerComponent } from './ThemeOptions/options-drawer/options-drawer.component';
// import {PageTitleComponent} from './Layout/Components/page-title/page-title.component';

// HEADER

import { HeaderComponent } from './Layout/Components/header/header.component';
import { DotsComponent } from './Layout/Components/header/elements/dots/dots.component';
import { SearchBoxComponent } from './Layout/Components/header/elements/search-box/search-box.component';
import { MegamenuComponent } from './Layout/Components/header/elements/mega-menu/mega-menu.component';
import { MegapopoverComponent } from './Layout/Components/header/elements/mega-menu/elements/megapopover/megapopover.component';
import { UserBoxComponent } from './Layout/Components/header/elements/user-box/user-box.component';
import { DrawerComponent } from './Layout/Components/header/elements/drawer/drawer.component';

// SIDEBAR

import { SidebarComponent } from './Layout/Components/sidebar/sidebar.component';
import { LogoComponent } from './Layout/Components/sidebar/elements/logo/logo.component';

// FOOTER

import { FooterComponent } from './Layout/Components/footer/footer.component';
import { FooterDotsComponent } from './Layout/Components/footer/elements/footer-dots/footer-dots.component';
import { FooterMenuComponent } from './Layout/Components/footer/elements/footer-menu/footer-menu.component';

// Pages
import { LoginComponent as LoginComponentSarlaft } from './Login/login/login.component';

// Components

// Apex Charts
import { NgApexchartsModule } from 'ng-apexcharts';
// Gauges Charts

import { GaugeModule } from 'angular-gauge';
import { TrendModule } from 'ngx-trend';

import { MsalModule } from '@azure/msal-angular';
// import { OAuthSettings } from '../assets/class/oauth';
import { OAuthSettings } from '../environments/environment';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { MatCard, MatCardModule } from '@angular/material/card';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// Angular Material
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [

    // LAYOUT

    AppComponent,
    BaseLayoutComponent,
    AppsLayoutComponent,
    PagesLayoutComponent,
    OptionsDrawerComponent,

    // HEADER

    HeaderComponent,
    DotsComponent,
    SearchBoxComponent,
    MegamenuComponent,
    MegapopoverComponent,
    UserBoxComponent,
    DrawerComponent,
    // SIDEBAR

    SidebarComponent,
    LogoComponent,

    // FOOTER

    FooterComponent,
    FooterDotsComponent,
    FooterMenuComponent,

    // // User Pages
    LoginComponentSarlaft,
    PageNotFoundComponent,

    // Tables

    //Dialogs
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    NgReduxModule,
    CommonModule,
    LoadingBarRouterModule,
    MatCardModule,
    SocialLoginModule,

    // Angular Bootstrap Components

    PerfectScrollbarModule,
    NgbModule,
    FontAwesomeModule,
    LaddaModule,
    FormsModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    RoundProgressModule,
    ToastrModule.forRoot(),
    SlickCarouselModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ModalModule.forRoot(),
    CountUpModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: ''
    }),
    ImageCropperModule,
    NouisliderModule,
    NgSelectModule,
    SelectDropDownModule,
    NgMultiSelectDropDownModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    AngularEditorModule,
    HttpClientModule,
    TextMaskModule,
    ClipboardModule,
    TextareaAutosizeModule,
    ColorPickerModule,
    DropzoneModule,

    // Charts

    ChartsModule,
    NgApexchartsModule,
    GaugeModule.forRoot(),
    TrendModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    // Angular Material Components
    MatCheckboxModule,
    MsalModule.forRoot({
      auth: {
        clientId: OAuthSettings.appId,
        authority: 'https://login.microsoftonline.com/1faad5df-429c-4bb8-abf6-0924bbebd870/',
        // redirectUri: 'http://localhost:4200/pages/login'
      }
    })
  ],
  providers: [
    {
      provide:
        PERFECT_SCROLLBAR_CONFIG,
      // DROPZONE_CONFIG,
      useValue:
        DEFAULT_PERFECT_SCROLLBAR_CONFIG,
      // DEFAULT_DROPZONE_CONFIG,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '776660365811-bsa43gho2poq3uu898tui8g31lr7e778.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig
    },
    ConfigActions,
    ThemeOptions,
    CookieService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(private ngRedux: NgRedux<ArchitectUIState>,
    private devTool: DevToolsExtension) {

    this.ngRedux.configureStore(
      rootReducer,
      {} as ArchitectUIState,
      [],
      [this.devTool.isEnabled() ? this.devTool.enhancer() : f => f]
    );

  }
}
