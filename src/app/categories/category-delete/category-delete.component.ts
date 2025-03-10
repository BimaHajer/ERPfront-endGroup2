import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrl: './category-delete.component.css'
})
export class CategoryDeleteComponent {
    @Input() allSelected: number[] | undefined
    @Output() closed = new EventEmitter<boolean>();
    @Output() saved = new EventEmitter<boolean>();

    alertError: boolean = false
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT
    toDisable: number[] = []
    toDelete: number[] = []
    idsDisable: string = '';
    idsDelete: string = '';

    msgAlertDisable: string = ''
    msgAlertDelete: string = ''

    constructor(private CategoriesService: CategoriesService) { }

    ngOnInit(): void {
      if (this.allSelected?.length != 0) {
        this.CategoriesService.getCategories({ loadRelationIds: true, where: { id: {type: "in", value: this.allSelected} } }).subscribe(
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
                    this.msgAlertDisable = "Catégorie: \" " + this.toDisable + " \" a des relations avec d'autres tables. Vous ne pouvez que le désactiver !"
                  } else
                    this.msgAlertDisable = "Les catégories: \" " + this.toDisable + " \" ont des relations avec d'autres tables. Vous ne pouvez que les désactiver !"
                }
                if (this.toDelete.length != 0) {
                  if (this.toDelete.length == 1) {
                    this.msgAlertDelete = "Voulez-vous vraiment supprimer Catégorie: \" " + this.toDelete + " \" !"
                  } else
                    this.msgAlertDelete = "Voulez-vous vraiment supprimer Les catégories: \" " + this.toDelete + " \" !"
                }
              }
            })
          })
      }
    }

    close() {
      this.closed.emit(false);
    }

    deleteCategory() {
      if (this.allSelected?.length != 0) {
        this.validateBtnState = ClrLoadingState.LOADING
        this.CategoriesService.deleteMultiple(this.toDelete, this.toDisable).subscribe(
          data => {
            if (data == true) {
              this.alertError = false
              this.saved.emit(true);
            } else
              this.alertError = true
          },
          err => {
            console.error('Observer got an error: ' + err)
            this.alertError = true
            this.validateBtnState = ClrLoadingState.ERROR
          }
        );
      }
    }
}
