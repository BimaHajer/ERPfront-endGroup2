import { Component } from '@angular/core';
import { provider } from '../providers';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProvidersService } from '../providers.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrl: './provider-detail.component.css'
})
export class ProviderDetailComponent {
    provider = new provider
    // providerAdd = new provider()
    // providerEdit = new provider()
    showAlert: boolean = false;
    providerId: number = -1;
    currentProvider: number = -1
    // disable: boolean = false;
    // created: string = ''
    // updated: string = ''
    // src: string;
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private providerService: ProvidersService, private sharedService: SharedService) { }
  
    ngOnInit(): void {
      this.currentProvider = +this.sharedService.getCookie('idprovider')
  
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.providerId = Number(params.get('id'))
        this.getProvider()
  
      })
    }
  
    getProvider() {
      this.providerService.getProvider(this.providerId).subscribe(
        (data:any) => {
          this.provider = data
        },
        err => { console.error('Observer got an error: ' + err) },
      )
    }
  
    deleteAction() {
      this.showAlert = true;
    }
  
    close() {
      this.showAlert = false;
    }
  
    save() {
      this.router.navigate(['../../providers']);
      this.showAlert = false;
    }
  
    redirectTo() {
     window.history.back();
    }

}
