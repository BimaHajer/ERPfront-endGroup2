import { Component } from '@angular/core';
import { Client } from '../clients'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClrLoadingState } from '@clr/angular';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ClientService } from '../clients.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-client-edit',
  templateUrl: './clients-edit.component.html',
  styleUrls: ['./clients-edit.component.css']
})
export class ClientsEditComponent {
    clientId!: number;
    client: Client = new Client();
    success: boolean = false;
    erreurMsg: string = '';
    registerForm: FormGroup;
    validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
    msgAlert: string = '';
     alert: Alert = new Alert();

    constructor(
      private formBuilder: FormBuilder,
      private activatedRoute: ActivatedRoute,
      private clientService: ClientService  // Utilisation du service ClientsService
    ) {
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        picture: [],
        address: [],
        zipCode: [, Validators.maxLength(5)],
        active: [false]
      });
    }

    ngOnInit() {
      this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
        this.clientId = Number(params.get('id'));
        this.getClient();
      });
    }

    getClient() {
      this.clientService.getClient(this.clientId).subscribe(
        (data: any) => {
          this.client = data;
          this.registerForm.patchValue(this.client);
        },
        err => {
          console.error('Erreur lors de la récupération du client: ' + err);
        }
      );
    }

    actionClose() {
      this.success = false;
    }

    submitAction(top: HTMLElement) {
      if (this.registerForm.valid) {
        this.validateBtnState = ClrLoadingState.LOADING;
        if (this.clientId) {
          this.clientService.editClient(this.clientId, this.registerForm.value).subscribe(
            data => {
              this.client = data;
              this.success = true;
              this.validateBtnState = ClrLoadingState.SUCCESS;
              this.alert = { success: true, msgSuccess: "La modification du clientt " + data.id + " a été effectué avec succès! ", echec: false, open: true }

            },
            err => {
              console.error('Erreur lors de la modification du client: ' + err);
              if (/e-mail existe déjà/.test(err.error.message)) {
                this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
              } else {
                this.alert = { success: false, msgEchec: "La modification du client a échoué.", echec: true, open: true }
              }
              this.success = false;
              this.validateBtnState = ClrLoadingState.ERROR;
            }
          );
        }
      }
      this.scroll(top);
    }

    scroll(el: HTMLElement) {
      el.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }

    redirectTo() {
      window.history.back();  // Rediriger vers la page précédente
    }
}
