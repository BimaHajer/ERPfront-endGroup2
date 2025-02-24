import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() success: boolean | undefined
  @Input() echec: boolean | undefined
  @Input() msgSuccess: string | undefined
  @Input() msgEchec: string | undefined
  @Output() closed = new EventEmitter<boolean>();

  actionClose() {
    this.closed.emit(true);
  }
}
