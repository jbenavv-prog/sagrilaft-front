import { Component, OnInit, TemplateRef } from '@angular/core';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';
import { ThemeOptions } from '../../../../../theme-options';
import { DomSanitizer } from '@angular/platform-browser';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styles: ['.badge { font-weight: normal; }',
    '.dropdown-menu-header .dropdown-menu-header-inner {height: 150px;}',
    '.botonVerde{ background-color: #12AD8F; color: #FFFFFF; font-weight: normal}']
})
export class UserBoxComponent implements OnInit {
  ngOnInit() { }

  // faCalendar = faCalendar;
  // unsafeImageUrl: any;
  // imageUrl: any;
  // data: any;
  // correo: String;
  // apellidos: String;
  // modalRegistro: BsModalRef;
  // formaActualizarClave: FormGroup;
  // showUpdatePass = true;
  // toggleDrawer() {
  //   this.globals.toggleDrawer = !this.globals.toggleDrawer;
  // }

  // constructor(private validador: ValidadorService,
  //   private modalServiceRegistro: BsModalService,
  //   private fb: FormBuilder,
  //   private proveedoresService: ProveedoresService,
  //   public authService: AuthService,
  //   public globals: ThemeOptions,
  //   private sanitizer: DomSanitizer,
  //   private route: Router) {
  // }

  // ngOnInit() {
  //   let token = localStorage.getItem('TokenProveedores');
  //   var decoded: any = jwt_decode(token);
  //   this.showUpdatePass = true;
  //   if (decoded.username) {
  //     this.correo = decoded.username;
  //     this.showUpdatePass = false;
  //   }
  //   else
  //     this.correo = decoded.correo;
  // }
  // cerrarSesion() {
  //   this.authService.signOut();
  // }
  // get claveR() {
  //   return this.formaActualizarClave.get('clave');
  // }
  // get passw1R() {
  //   return this.formaActualizarClave.get('passw1');
  // }
  // get passw2R() {
  //   return this.formaActualizarClave.get('passw2');
  // }
  // get passw2NoValido() {
  //   const pass1 = this.formaActualizarClave.get('passw1').value;
  //   const pass2 = this.formaActualizarClave.get('passw2').value;
  //   return (pass1 === pass2) ? false : true;
  // }
  // crearFormularioRecuperarClave() {
  //   this.formaActualizarClave = this.fb.group({
  //     passw1: ['', Validators.required],
  //     passw2: ['', Validators.required],
  //     clave: ['', Validators.required],
  //   }, {
  //     validators: this.validador.passwordsIguales('passw1', 'passw2')
  //   });
  // }
  // openModalRecuperarClave(templateRecuperarClave: TemplateRef<any>) {
  //   this.crearFormularioRecuperarClave();
  //   this.modalRegistro = this.modalServiceRegistro.show(templateRecuperarClave);
  // }
  // actualizarClave() {
  //   if (!this.formaActualizarClave.invalid) {
  //     this.proveedoresService.actualizarClave(this.formaActualizarClave.value, this.correo).subscribe(respuesta => {
  //       if (respuesta.ok == true) {
  //         this.closeVentana();
  //         Swal.fire({
  //           title: 'OK',
  //           text: `${respuesta.message}`,
  //           icon: 'info'
  //         });
  //         this.authService.signOut();
  //       } else if (respuesta.ok == false) {
  //         Swal.fire({
  //           title: 'Alerta',
  //           text: `${respuesta.message}`,
  //           icon: 'info'
  //         });
  //       }
  //     });
  //   }

  // }
  // closeVentana(): void {
  //   this.modalRegistro.hide();
  // }
}
