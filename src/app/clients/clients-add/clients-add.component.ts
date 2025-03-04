import { Component } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../clients.service';
import { Alert } from '../../shared/shared.service';

@Component({
  selector: 'app-client-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.css'],
})
export class ClientsAddComponent {
  validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  success: boolean = false;
  erreurMsg: string = '';
  msgAlert: string = '';
  registerForm: FormGroup;
 alert: Alert = new Alert();


  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      address: [''],
      zipCode: ['', Validators.maxLength(5)],
      active: [true],
    });
  }

  ngOnInit() {}

  close() {
    this.success = false;
  }

  submitAction(top: HTMLElement) {
    if (this.registerForm.valid) {
      this.validateBtnState = ClrLoadingState.LOADING;
      this.clientService.addClient(this.registerForm.value).subscribe(
        (data) => {
          this.validateBtnState = ClrLoadingState.SUCCESS;
          this.registerForm.reset({ active: true });

            this.alert = { success: true, msgSuccess: "L'ajout de client " + data.id + " a été effectué avec succès! ", echec: false, open: true }

        },
        (err) => {
          console.error('Observer got an error: ' + err);
          if (/e-mail existe déjà/.test(err.error.message)) {
            this.alert = { success: false, msgEchec: err.error.message, echec: true, open: true }
          } else {
            this.alert = { success: false, msgEchec: "L'ajout d'un client a été échoué ..", echec: true, open: true }
          }
          this.validateBtnState = ClrLoadingState.ERROR;
          this.success = false;
        }
      );
    }
    this.scroll(top);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }

  redirectTo() {
    window.history.back();
  }
}
