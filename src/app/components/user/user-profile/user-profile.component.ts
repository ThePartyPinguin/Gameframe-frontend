import { Component, OnInit } from '@angular/core';
import {ProfileService} from '../../../services/profile/profile.service';
import {UserProfile} from '../../../models/dto/user-dto/user-profile';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {FileService} from '../../../services/files/file.service';

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
  updateSubmit : boolean;
  errorUpdating: boolean;

  tempUserProfile: UserProfile;
  updateProfileForm: FormGroup;

  profileAvatarFileChanged : boolean;

  avatarUploadForm : FormGroup;

  constructor(private formBuilder: FormBuilder, private profileService : ProfileService, private route: ActivatedRoute, private fileService : FileService) {

  }

  ngOnInit() {
    const userName = this.route.snapshot.paramMap.get("username");

    if(userName == null)
    {
      this.profileService.getPrivateProfile().subscribe((response) => {
        console.log(response);
        if(response.body.responseCode !== 200)
        {
          this.errorUpdating = true;
          return;
        }
        this.userProfile = response.body;

        this.profileLoaded = true;
        this.privateProfile = true;
      })
    }
    else{
      this.profileService.getPublicProfile(userName).subscribe((response) => {
        console.log(response);
        if(response.body.responseCode !== 500)
        {
          this.errorUpdating = true;
          return;
        }
        this.userProfile = response.body;

        const local_id = localStorage.getItem(environment.user_id);

        console.log(this.userProfile.user.userId);

        this.privateProfile = local_id === this.userProfile.user.userId.toString();

        this.profileLoaded = true;
      });
    }

    this.avatarUploadForm = this.formBuilder.group({
      avatar: ['']
    });
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
    //this.updateSubmit = true;


    if(this.updateProfileForm.invalid){
      return;
    }

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
        this.updateSubmit = false;
        if(response.status === 200)
        {
          this.editMode = false;

        }

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

  onProfileAvatarFileChange(event) {
    // let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log(file);

      this.fileService.uploadNewProfileAvatar(file).subscribe((response) => {
        console.log(response);
        // this.userProfile.profile.profilePicture = response.body.imageName;
      });
    }
  }
}
