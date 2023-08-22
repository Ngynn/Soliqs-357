import { ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  @ViewChild('appDialog', { static: true })
  dialog!: ElementRef<HTMLDialogElement>;
  cdr = inject(ChangeDetectorRef);
  
  openDialog() {
    this.dialog.nativeElement.showModal();
    this.cdr.detectChanges();
  }
  closeDialog() {
    this.dialog.nativeElement.close();
    this.cdr.detectChanges();
  }
}
