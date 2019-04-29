import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../services/profile/profile.service';
import {UserProfileResponse} from '../../../models/dto/user-dto/user-profile-response';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userProfile : UserProfileResponse;

  constructor(private profileService : ProfileService, private route: ActivatedRoute) { }

  ngOnInit() {
    const userName = this.route.snapshot.paramMap.get("username")

    if(userName == null)
    {
      this.profileService.getPrivateProfile().subscribe((response) => {
        this.userProfile = response.body;
      })
    }
    else{
      this.profileService.getPublicProfile(userName);
    }

  }

}
