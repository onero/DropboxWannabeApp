import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { NewUserComponent } from './new-user/new-user.component';
import {
  MatButtonModule, MatCardModule, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule,
  MatListModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CoreModule} from '../core/core.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {AngularFireStorageModule} from 'angularfire2/storage';
import { UserService } from './shared/user.service';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {UnifiedMaterialModule} from '../unified-material.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    RouterModule,
    FlexLayoutModule,
    UnifiedMaterialModule,
  ],
  declarations: [ProfileComponent, NewUserComponent],
  providers: [UserService]
})
export class UserModule { }
