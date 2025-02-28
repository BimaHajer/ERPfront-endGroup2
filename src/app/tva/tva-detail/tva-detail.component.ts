import { Component } from '@angular/core';
import { Tva } from '../tva';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TvaService } from '../tva.service';
import { SharedService } from '../../shared/shared.service';

@Component({
  selector: 'app-tva-detail',
  templateUrl: './tva-detail.component.html',
  styleUrl: './tva-detail.component.css'
})
export class TvaDetailComponent {
    Tva = new Tva
    showAlert: boolean = false;
    tvaId: number = -1;
    currentTva: number = -1
    constructor(private activatedRoute: ActivatedRoute, private router: Router, private TvaService: TvaService, private sharedService: SharedService) { }
  
    ngOnInit(): void {
      this.currentTva = +this.sharedService.getCookie('idTva')
  
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.tvaId = Number(params.get('id'))
        this.getTva()
  
      })
    }
  
    getTva() {
      this.TvaService.getTva(this.tvaId ).subscribe(
        (data:any) => {
          this.Tva = data
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
      this.router.navigate(['../../tva']);
      this.showAlert = false;
    }
  
    redirectTo() {
     window.history.back();
    }
}
