import { ChangeDetectorRef, Component, ElementRef, ViewChild, inject } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  item1 = {
    sync: false,
    favorite: false,
    monitoring: false
  }
  item2 = {
    sync: false,
    favorite: false,
    monitoring: false
  }
  item3 = {
    sync: false,
    favorite: false,
    monitoring: false
  }
  item4 = {
    sync: false,
    favorite: false,
    monitoring: false
  }
  showImageInput = false
  @ViewChild('appDialog2', { static: true })
  dialog2!: ElementRef<HTMLDialogElement>;
  cdr2 = inject(ChangeDetectorRef);

  @ViewChild('appDialog3', { static: true })
  dialog3!: ElementRef<HTMLDialogElement>;
  cdr3 = inject(ChangeDetectorRef);
  
  openCommentDialog() {
    this.dialog2.nativeElement.showModal();
    this.cdr2.detectChanges();
  }
  closeCommentDialog() {
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
  }

  repost1(){
    if(!this.item1.sync){
      this.item1.sync = true;
    }
    else{
      this.item1.sync = false;
    }
  }
  repost2(){
    if(!this.item2.sync){
      this.item2.sync = true;
    }
    else{
      this.item2.sync = false;
    }
  }
  repost3(){
    if(!this.item3.sync){
      this.item3.sync = true;
    }
    else{
      this.item3.sync = false;
    }
  }
  repost4(){
    if(!this.item4.sync){
      this.item4.sync = true;
    }
    else{
      this.item4.sync = false;
    }
  }
  like1(){
    if(!this.item1.favorite){
      this.item1.favorite = true;
    }
    else{
      this.item1.favorite = false;
    }
  }
  like2(){
    if(!this.item2.favorite){
      this.item2.favorite = true;
    }
    else{
      this.item2.favorite = false;
    }
  }
  like3(){
    if(!this.item3.favorite){
      this.item3.favorite = true;
    }
    else{
      this.item3.favorite = false;
    }
  }
  like4(){
    if(!this.item4.favorite){
      this.item4.favorite = true;
    }
    else{
      this.item4.favorite = false;
    }
  }
  monitoring1(){
    if(!this.item1.monitoring){
      this.item1.monitoring = true;
    }
    else{
      this.item1.monitoring = false;
    }
  }
  monitoring2(){
    if(!this.item2.monitoring){
      this.item2.monitoring = true;
    }
    else{
      this.item2.monitoring = false;
    }
  }
  monitoring3(){
    if(!this.item3.monitoring){
      this.item3.monitoring = true;
    }
    else{
      this.item3.monitoring = false;
    }
  }
  monitoring4(){
    if(!this.item4.monitoring){
      this.item4.monitoring = true;
    }
    else{
      this.item4.monitoring = false;
    }
  }

  openEditProfileDialog() {
    this.dialog3.nativeElement.showModal();
    this.cdr3.detectChanges();
  }
  closeEditProfileDialog() {
    this.dialog3.nativeElement.close();
    this.cdr3.detectChanges();
  }
}
