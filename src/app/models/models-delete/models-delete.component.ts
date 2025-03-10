import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { ModelsService } from '../models.service';

@Component({
  selector: 'app-delete-modele',
  templateUrl: './models-delete.component.html',
  styleUrl: './models-delete.component.css'
})
export class ModelsDeleteComponent {
  @Input() allSelected: number[] | undefined
  @Output() closed = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<boolean>();

  alertError: boolean = false
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
  toDisable: number[] = []
  toDelete: number[] = []
  msgAlertDisable: string = ''
  msgAlertDelete: string = ''
  idsDisable: string = '';
  idsDelete: string = '';
  constructor(private modeleService: ModelsService) { }

  ngOnInit(): void {
    if (this.allSelected?.length != 0) {
      this.modeleService.getModels({ loadRelationIds: true, where: { id: {type: "in", value: this.allSelected} } }).subscribe(
        data => {
          data[0].forEach((element:any) => {
            if (element.products?.length) {
              if (element.id) {
                this.toDisable.push(element.id);
                this.idsDisable += element.id + ', ';
              }
            } else {
              if (element.id) {
                this.toDelete.push(element.id);
                this.idsDelete += element.id + ', ';
              }
            }


            if (this.toDelete.length + this.toDisable.length == this.allSelected?.length) {
              if (this.toDisable.length != 0) {
                if (this.toDisable.length == 1) {
                  this.msgAlertDisable = "Le modele: \" " + this.toDisable + " \" a des relations avec d'autres tables. Vous ne pouvez que le désactiver !"
                } else
                  this.msgAlertDisable = "Les modeles: \" " + this.toDisable + " \" ont des relations avec d'autres tables. Vous ne pouvez que les désactiver !"
              }
              if (this.toDelete.length != 0) {
                if (this.toDelete.length == 1) {
                  this.msgAlertDelete = "Voulez-vous vraiment supprimer le modele: \" " + this.toDelete + " \" !"
                } else
                  this.msgAlertDelete = "Voulez-vous vraiment supprimer les modeles: \" " + this.toDelete + " \" !"
              }
            }
          })
        })
    }
  }

  close() {
    this.closed.emit(false);
  }
  deleteModele() {
    if (this.allSelected?.length != 0) {
      this.validateBtnState = ClrLoadingState.LOADING;
      this.modeleService.deleteMultipleModels(this.toDelete, this.toDisable).subscribe(
        (data: boolean) => {
          if (data) {
            this.alertError = false;
            this.saved.emit(true);
          } else {
            this.alertError = true;
          }
        },
        (err: any) => {
          console.error('Observer got an error: ' + err);
          this.alertError = true;
          this.validateBtnState = ClrLoadingState.ERROR;
        }
      );
    }
  }

}
