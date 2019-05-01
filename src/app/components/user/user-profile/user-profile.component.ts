import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../services/profile/profile.service';
import {UserProfile} from '../../../models/dto/user-dto/user-profile';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profileLoaded: boolean;
  userProfile : UserProfile;

  editMode: boolean;
  privateProfile: boolean;

  tempUserProfile: UserProfile;

  updateProfileForm: FormGroup;

  constructor(private profileService : ProfileService, private route: ActivatedRoute) {

    // this.updateProfileForm = new FormGroup({
    //   usernameControl : new FormControl('',{
    //     validators: [Validators.required]
    //   }),
    //   fullNameControl: new FormControl('', {
    //   }),
    //   emailControl : new FormControl('', {
    //     validators: [Validators.required, Validators.email]
    //   }),
    //   locationControl: new FormControl(),
    //   bioControl: new FormControl()
    // })

  }

  ngOnInit() {
    const userName = this.route.snapshot.paramMap.get("username")

    if(userName == null)
    {
      this.profileService.getPrivateProfile().subscribe((response) => {
        this.userProfile = response.body;
        this.profileLoaded = true;
        this.privateProfile = true;
      })
    }
    else{
      this.profileService.getPublicProfile(userName);
    }
  }

  openEditMode(){

    if(this.updateProfileForm == null){
      this.updateProfileForm = new FormGroup({
        usernameControl : new FormControl(this.userProfile.user.userName,{
          validators: [Validators.required]
        }),
        fullNameControl: new FormControl(this.userProfile.user.fullName, {
        }),
        emailControl : new FormControl(this.userProfile.user.email, {
          validators: [Validators.required, Validators.email]
        }),
        locationControl: new FormControl(this.userProfile.profile.location),
        websiteControl: new FormControl(this.userProfile.profile.website),
        bioControl: new FormControl(this.userProfile.profile.bio)
      });
    }

    this.editMode = true;

    this.tempUserProfile = this.userProfile;
  }

  get formControl(){
    return this.updateProfileForm.controls;
  }

  saveEdit(){
    this.editMode = false;

    this.tempUserProfile.user.userName = this.formControl.usernameControl.value;
    this.tempUserProfile.user.fullName = this.formControl.fullNameControl.value;
    this.tempUserProfile.user.email = this.formControl.emailControl.value;
    this.tempUserProfile.profile.location = this.formControl.locationControl.value;
    this.tempUserProfile.profile.website = this.formControl.websiteControl.value;
    this.tempUserProfile.profile.bio = this.formControl.bioControl.value;
    //
    // // console.log(this.tempUserProfile)
    // // console.log(this.formControl)
    this.userProfile = this.tempUserProfile;
    console.log(this.userProfile);


    this.profileService.updateProfile(this.userProfile).subscribe(
      (response) => {
      console.log(response)
    });
  }

  cancelEdit(){
    this.editMode = false;
  }

  goToUserWebsite(){
    if(this.userProfile.profile.website.startsWith('https://') || this.userProfile.profile.website.startsWith('http://')){
      window.open(this.userProfile.profile.website, '_blank');
    }
    else{
      window.open('https://' + this.userProfile.profile.website, '_blank');
    }
  }
}
