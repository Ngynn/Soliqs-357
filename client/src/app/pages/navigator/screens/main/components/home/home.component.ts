import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from 'src/app/ngrx/states/auth.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  idToken$: Observable<string> = this.store.select('idToken', 'idToken');
  constructor(private store: Store<{ idToken: AuthState }>) {
    this.idToken$.subscribe((value) => {
      console.log('hello id token');
      console.log(value);
      if (value) {
        console.log(value);
      }
    });
  }

  listImg: string[] = [
    'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
    'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjoGr1Xb3hX9FcOZWi8b07rG9MpxsyEHwaGQ&usqp=CAU',
    'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
    'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
    'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
    'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
    'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
    'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
  ];

  showRemaining: boolean = false;
  showMoreImages() {
    this.showRemaining = true;
  }
  ngOnInit(): void {
    if (this.listImg.length > 4) {
      this.showRemaining = true;
    }
  }
  item1 = {
    sync: false,
    favorite: false,
    monitoring: false,
  };
  item2 = {
    sync: false,
    favorite: false,
    monitoring: false,
  };
  item3 = {
    sync: false,
    favorite: false,
    monitoring: false,
  };
  item4 = {
    sync: false,
    favorite: false,
    monitoring: false,
  };
  showImageInput = false;
  @ViewChild('appDialog2', { static: true })
  dialog2!: ElementRef<HTMLDialogElement>;
  cdr2 = inject(ChangeDetectorRef);

  handleImageUpload(event: any) {
    const file = event.target.files[0]; // Lấy file hình ảnh từ sự kiện

    // Thực hiện các xử lý liên quan đến tệp hình ảnh tại đây

    // Sau khi hoàn thành xử lý, bạn có thể ẩn input file bằng cách đặt lại biến showImageInput về false
    this.showImageInput = false;
  }

  repost1() {
    if (!this.item1.sync) {
      this.item1.sync = true;
    } else {
      this.item1.sync = false;
    }
  }
  repost2() {
    if (!this.item2.sync) {
      this.item2.sync = true;
    } else {
      this.item2.sync = false;
    }
  }
  repost3() {
    if (!this.item3.sync) {
      this.item3.sync = true;
    } else {
      this.item3.sync = false;
    }
  }
  repost4() {
    if (!this.item4.sync) {
      this.item4.sync = true;
    } else {
      this.item4.sync = false;
    }
  }
  like1() {
    if (!this.item1.favorite) {
      this.item1.favorite = true;
    } else {
      this.item1.favorite = false;
    }
  }
  like2() {
    if (!this.item2.favorite) {
      this.item2.favorite = true;
    } else {
      this.item2.favorite = false;
    }
  }
  like3() {
    if (!this.item3.favorite) {
      this.item3.favorite = true;
    } else {
      this.item3.favorite = false;
    }
  }
  like4() {
    if (!this.item4.favorite) {
      this.item4.favorite = true;
    } else {
      this.item4.favorite = false;
    }
  }
  monitoring1() {
    if (!this.item1.monitoring) {
      this.item1.monitoring = true;
    } else {
      this.item1.monitoring = false;
    }
  }
  monitoring2() {
    if (!this.item2.monitoring) {
      this.item2.monitoring = true;
    } else {
      this.item2.monitoring = false;
    }
  }
  monitoring3() {
    if (!this.item3.monitoring) {
      this.item3.monitoring = true;
    } else {
      this.item3.monitoring = false;
    }
  }
  monitoring4() {
    if (!this.item4.monitoring) {
      this.item4.monitoring = true;
    } else {
      this.item4.monitoring = false;
    }
  }
  openCommentDialog() {
    this.dialog2.nativeElement.showModal();
    this.cdr2.detectChanges();
  }
  closeCommentDialog() {
    this.dialog2.nativeElement.close();
    this.cdr2.detectChanges();
  }
  @ViewChild('appDialogDetailPost', { static: true })
  dialogDetailPost!: ElementRef<HTMLDialogElement>;
  cdrDetailPost = inject(ChangeDetectorRef);
  openDetailDialog() {
    this.dialogDetailPost.nativeElement.showModal();
    this.cdrDetailPost.detectChanges();
  }
  closeDetailDialog() {
    this.dialogDetailPost.nativeElement.close();
    this.cdrDetailPost.detectChanges();
  }
}
