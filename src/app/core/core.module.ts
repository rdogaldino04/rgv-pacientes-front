import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AlertModule } from '../shared/components/alert/alert.module';
import { LoadingModule } from '../shared/components/loading/loading.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './auth/request.interceptor';
import { RgvNavbarModule } from '../shared/components/rgv-navbar/rgv-navbar.module';

@NgModule({
    declarations: [HeaderComponent],
    exports: [HeaderComponent],
    imports: [
        CommonModule,
        RouterModule,
        AlertModule,
        LoadingModule,
        RgvNavbarModule
    ],
    providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: RequestInterceptor,
          multi: true
      }
  ]

})
export class CoreModule { }
