import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { CoreModule } from './core/core.module';
import {ClarityIcons,minusIcon,detailsIcon,circleIcon,homeIcon,cogIcon,dashboardIcon,carIcon,clipboardIcon,userIcon,logoutIcon,
  shoppingCartIcon,usersIcon,pieChartIcon,administratorIcon,employeeGroupIcon,tagsIcon,coinBagIcon,plusIcon,eCheckIcon,noteIcon,
  banIcon,imageIcon,timesCircleIcon, organizationIcon, floppyIcon, storeIcon, trashIcon, pencilIcon ,linkIcon, cloneIcon ,searchIcon,
  filterIcon ,resizeIcon, shrinkIcon, sadFaceIcon,bookmarkIcon, calculatorIcon ,creditCardIcon, bookIcon,undoIcon,blockIcon, 
  blocksGroupIcon, truckIcon, barChartIcon, lockIcon, addTextIcon, angleIcon, exclamationCircleIcon, checkCircleIcon, checkIcon, 
  timesIcon, calendarIcon, infoCircleIcon, plusCircleIcon, windowCloseIcon, popOutIcon,arrowIcon, exclamationTriangleIcon,
  formIcon,refreshIcon,downloadIcon,envelopeIcon,happyFaceIcon,fileSettingsIcon,worldIcon,nvmeIcon,fileIcon,printerIcon,gridViewIcon,
  factoryIcon
} from '@cds/core/icon';
import '@cds/core/icon/register.js';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';


ClarityIcons.addIcons(homeIcon, minusIcon,circleIcon,detailsIcon,plusIcon,cogIcon, dashboardIcon, carIcon, clipboardIcon, shoppingCartIcon, userIcon, logoutIcon, usersIcon, pieChartIcon,
  administratorIcon, employeeGroupIcon, tagsIcon, coinBagIcon,eCheckIcon,noteIcon,imageIcon,timesCircleIcon, banIcon,organizationIcon,floppyIcon,storeIcon,trashIcon,pencilIcon,linkIcon,cloneIcon,searchIcon,filterIcon,
  resizeIcon,shrinkIcon,sadFaceIcon,bookmarkIcon,calculatorIcon ,creditCardIcon, bookIcon, undoIcon, blockIcon, blocksGroupIcon,truckIcon,barChartIcon,lockIcon,addTextIcon,angleIcon,exclamationCircleIcon,checkCircleIcon,checkIcon,timesIcon,
  calendarIcon,infoCircleIcon,plusCircleIcon,windowCloseIcon,popOutIcon,arrowIcon,exclamationTriangleIcon, formIcon, refreshIcon, downloadIcon, envelopeIcon,happyFaceIcon,fileSettingsIcon,worldIcon,nvmeIcon, fileIcon,printerIcon,gridViewIcon,factoryIcon);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ClarityModule,
    CoreModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
