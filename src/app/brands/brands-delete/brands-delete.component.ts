import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { BrandsService } from '../brands.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brands-delete.component.html',
  styleUrls: ['./brands-delete.component.css']
})
export class BrandDeleteComponent {
  @Input() allSelected: number[] | undefined;
  @Output() closed = new EventEmitter<boolean>();
  @Output() saved = new EventEmitter<boolean>();

  alertError: boolean = false;
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  toDisable: number[] = [];
  toDelete: number[] = [];
  msgAlertDisable: string = '';
  msgAlertDelete: string = '';
  idsDisable: string = '';
  idsDelete: string = '';

  constructor(private brandsService: BrandsService) {}

  ngOnInit(): void {
    if (this.allSelected?.length) {
      this.brandsService.getBrands({ loadRelationIds: true, where: { id: { type: "in", value: this.allSelected } } }).subscribe(
        data => {
          data[0].forEach((element: any) => {
            if (element.models?.length) {
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

            if (this.toDelete.length + this.toDisable.length === this.allSelected?.length) {
              if (this.toDisable.length) {
                this.msgAlertDisable = this.toDisable.length === 1
                  ? `La marque: "${this.toDisable}" a des relations avec d'autres tables. Vous ne pouvez que la désactiver !`
                  : `Les marques: "${this.toDisable}" ont des relations avec d'autres tables. Vous ne pouvez que les désactiver !`;
              }
              if (this.toDelete.length) {
                this.msgAlertDelete = this.toDelete.length === 1
                  ? `Voulez-vous vraiment supprimer la marque: "${this.toDelete}" ?`
                  : `Voulez-vous vraiment supprimer les marques: "${this.toDelete}" ?`;
              }
            }
          });
        }
      );
    }
  }

  close() {
    this.closed.emit(false);
  }

  deleteBrands() {
    if (this.allSelected?.length) {
      this.validateBtnState = ClrLoadingState.LOADING;
      this.brandsService.deleteMultipleBrands(this.toDelete, this.toDisable).subscribe(
        data => {
          if (data === true) {
            this.alertError = false;
            this.saved.emit(true);
          } else {
            this.alertError = true;
          }
        },
        () => {
          this.alertError = true;
          this.validateBtnState = ClrLoadingState.ERROR;
        }
      );
    }
  }
}
