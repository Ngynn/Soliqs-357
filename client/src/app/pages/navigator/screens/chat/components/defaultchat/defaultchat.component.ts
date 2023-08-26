import { ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-defaultchat',
  templateUrl: './defaultchat.component.html',
  styleUrls: ['./defaultchat.component.scss']
})
export class DefaultchatComponent {

  constructor(private router: Router ) { }


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

//   backToChat() {
//     this.router.navigate(['/chat']);
//   }
}
