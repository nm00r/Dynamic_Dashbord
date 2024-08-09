import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { first } from 'rxjs';
import { User} from 'src/app/Core/Interface/user';
import { UserService } from 'src/app/Core/Service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  currentUser: number | any;
  user: User | undefined;
  constructor(
    private activetedRout: ActivatedRoute,
    private userServ: UserService,
    private spinner: NgxSpinnerService
  ) {}
  
  ngOnInit(): void {
    this.spinner.show();
    this.activetedRout.paramMap.subscribe((param) => {
      const id = param.get('id');
      this.currentUser = Number(id);
      // console.log(this.currentUser);
    });
    this.userServ.getUserById(this.currentUser).subscribe({
      next: (res) => {
        this.user = (res as any).data;
        // console.log(this.user);
      },
      complete: () => {
        this.spinner.hide();
      },
    });
  }
}
