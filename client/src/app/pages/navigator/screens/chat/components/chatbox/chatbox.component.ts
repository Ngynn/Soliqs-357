import { ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
  
  constructor(private router: Router ) { }

  isInfo = false;
  goToInfo() {
    this.isInfo = true;
    this.router.navigate(['chat/inbox/info']);
  }

  goToChatbox() {
    this.router.navigate(['chat/inbox/id']);
    
  }

  // @ViewChild('appDialog', { static: true })
  // dialog!: ElementRef<HTMLDialogElement>;
  // cdr = inject(ChangeDetectorRef);
  
  // openDialog() {
  //   this.dialog.nativeElement.showModal();
  //   this.cdr.detectChanges();
  // }
  // closeDialog() {
  //   this.dialog.nativeElement.close();
  //   this.cdr.detectChanges();
  // }

  




}
