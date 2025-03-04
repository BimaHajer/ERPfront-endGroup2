import { Component } from '@angular/core';
import { Brand } from '../brands';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-brand-detail',
  templateUrl: './brands-detail.component.html',
  styleUrl: './brands-detail.component.css'
})
export class BrandsDetailComponent {
  brand = new Brand();
  showAlert: boolean = false;
  brandId: number = -1;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private brandService: BrandsService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.brandId = Number(params.get('id'));
      this.getBrand();
    });
  }

  getBrand() {
    this.brandService.getBrand(this.brandId).subscribe(
      (data: any) => {
        this.brand = data;
      },
      (err) => {
        console.error('Erreur lors de la récupération de la marque : ' + err);
      }
    );
  }

  deleteAction() {
    this.showAlert = true;
  }

  close() {
    this.showAlert = false;
  }

  save() {
    this.router.navigate(['../../brands']);
    this.showAlert = false;
  }

  redirectTo() {
    window.history.back();
  }
}
