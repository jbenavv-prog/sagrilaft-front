import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardRutasGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(): boolean {
    return true;
    }
  
}
