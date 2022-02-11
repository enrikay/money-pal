import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { UtilityService } from '../../../service/utility.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss']
})
export class VerifyAccountComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private utilityService: UtilityService,
  ) { }

  private initContents() {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        const token = paramMap.get('token');
        if (token) {
          this.authService.verifyUser(token);
        }
      });


    this.utilityService.setPageTitle('Account verification page');
  }

  ngOnInit(): void {
    this.initContents();
  }

}
