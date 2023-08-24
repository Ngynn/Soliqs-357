import { ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listmessages',
  templateUrl: './listmessages.component.html',
  styleUrls: ['./listmessages.component.scss']
})
export class ListmessagesComponent {
  
  constructor(private router: Router ) { }
  
  goToChatbox() {
    this.router.navigate(['chat/inbox/id']);
  }
  goToChatbox2() {
    this.router.navigate(['chat/inbox/id2']);
  }

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
