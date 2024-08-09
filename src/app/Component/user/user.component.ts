import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/Core/Interface/user';
import { UserService } from 'src/app/Core/Service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  userList: User[] = [];
  currentPage: number = 1;
  disablebutton: boolean = false;
  isVisable: boolean = true;
  intervalId: any;

  set inputValue(value: string) {
    // console.log(value);
    this.searchById(value);
  }

  constructor(
    private userServ: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.getAllUsers(1);

    
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // clear interval when component is destroyed
  }

  updateData() {
    if (this.currentPage < 2) {
      this.nextPage();
    } else {
      this.prevPage();
    }
  }

  getAllUsers(currentPage: number) {
    this.spinner.show();
    this.userServ.getAllUsers(this.currentPage).subscribe({
      next: (res) => {
        this.userList = (res as any).data || [];
        // console.log(this.userList);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }

  searchById(value: string) {
    if (value.trim() === '') {
      this.getAllUsers(this.currentPage);
      this.isVisable = true;
    } else {
      let id = Number(value);
      if (id > 12) {
        this.userList = [];
      }
      // console.log(id);
      this.userServ.getUserById(id).subscribe({
        next: (res) => {
          this.userList = [(res as any).data];
          this.isVisable = false;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  nextPage() {
    if (this.currentPage < 2) {
      this.currentPage++;
      this.getAllUsers(this.currentPage);
    } else {
      this.disablebutton = true;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getAllUsers(this.currentPage);
    } else {
      this.disablebutton = true;
    }
  }
}
