import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  inject,
  OnInit,
} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-internal',
  templateUrl: './internal.component.html',
  styleUrls: ['./internal.component.scss'],
})
export class InternalComponent {
  constructor(private location: Location) {}
  joined: boolean = false;
  posts = [
    {
      avatarUrl:
        'https://upload.wikimedia.org/wikipedia/vi/thumb/a/a1/Man_Utd_FC_.svg/1200px-Man_Utd_FC_.svg.png',
      username: 'Nguyễn Minh Mập1',
      tagname: '@MậpMủmMỉm',
      time: '15 tháng 8',
      content: 'Hình ảnh phong cảnh',
      imageUrls: [
        'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],

      commentCount: '13k',
      repostCount: '11k',
      likeCount: '14k',
      monitoringCount: '200k',
    },
    {
      avatarUrl:
        'https://vnmedia.vn/file/8a10a0d36ccebc89016ce0c6fa3e1b83/062023/1_20230613142853.jpg',
      username: 'Trần Thành Huy1',
      tagname: '@HuyHuyHuy',
      time: '15 tháng 8',
      content: 'hình ảnh nhân vật ',
      imageUrls: [
        'https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],

      commentCount: '12k',
      repostCount: '13k',
      likeCount: '15k',
      monitoringCount: '200k',
    },
    {
      avatarUrl:
        'https://img.freepik.com/free-photo/cute-spitz_144627-7076.jpg?t=st=1692779137~exp=1692779737~hmac=3cc3a2ec042e6477875c549361ec7360c2f89645580f9510231302152fa2e4e1',
      username: 'Phùng Minh Khoa1',
      tagname: '@KhoaKhoaKhoa',
      time: '15 tháng 8',
      content: 'hình ảnh của chó cỏ ',
      imageUrls: [
        'https://images.pexels.com/photos/2734469/pexels-photo-2734469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'https://images.pexels.com/photos/1198802/pexels-photo-1198802.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      ],
      commentCount: 120,
      repostCount: 3,
      likeCount: 1,
      monitoringCount: 20,
    },
  ];
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

  join(): void {
    this.joined = true;
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
  back() {
    this.location.back();
  }
}
