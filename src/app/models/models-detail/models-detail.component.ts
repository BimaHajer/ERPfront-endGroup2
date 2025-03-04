import { Component, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Brand } from '../../brands/brands';
import { SharedService } from '../../shared/shared.service';
import { Modele } from '../models';
import { ModelsService } from '../models.service';

@Component({
  selector: 'app-detail-modele',
  templateUrl: './models-detail.component.html',
  styleUrls: ['./models-detail.component.css']
})
export class ModelsDetailComponent {

  @Input() allSelected: any[] = [];
  modele = new Modele();
  showAlert: boolean = false;
  modeleId: number = -1;
  currentModele: number = -1;
  brands: Brand[] = [];
  loading: boolean = true;
  form: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modeleService: ModelsService,
    private sharedService: SharedService,
  ) {}

  ngOnInit(): void {
    this.currentModele = +this.sharedService.getCookie('idModele');

    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.modeleId = Number(params.get('id'));
      this.getModele();
    });
  }

  getModele() {
    this.modeleService.getModel(this.modeleId).subscribe(
      (data: any) => {
        this.modele = data;
      },
      err => {
        console.error('Erreur lors de la récupération du modèle: ' + err);
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

  this.modeleService.deleteModel(this.modeleId).subscribe(
    (response: any) => {
      this.showAlert = false;
      this.router.navigate(['/models']);
    },
    (error) => {
      console.error('Erreur lors de la suppression du modèle: ', error);
      this.showAlert = false;
    }
  );
}


  redirectTo() {
    window.history.back();
  }
}
