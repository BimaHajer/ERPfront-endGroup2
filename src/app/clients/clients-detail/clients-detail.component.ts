import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ClientService } from '../clients.service';

@Component({
  selector: 'app-client-detail',
  templateUrl: './clients-detail.component.html',
  styleUrls: ['./clients-detail.component.css']
})
export class ClientsDetailComponent {

  client: any = {};
  showAlert: boolean = false;
  clientId: number = -1;
currentClient: any;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private clientService: ClientService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.clientId = Number(params.get('id'));
      this.getClient();
    });
  }

  getClient() {
    this.clientService.getClient(this.clientId).subscribe(
      (data: any) => {
        this.client = data;
      },
      err => { console.error('Error fetching client data: ' + err); }
    );
  }

  deleteAction() {
    this.showAlert = true;
  }

  close() {
    this.showAlert = false;
  }

  save() {
    this.router.navigate(['../../clients']);
    this.showAlert = false;
  }

  redirectTo() {
    window.history.back();
  }
}
