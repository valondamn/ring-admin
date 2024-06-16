import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
declare var $: any;

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit, OnDestroy {
  users: any[] = [];
  subs: Subscription[] = [];
  errorMessage: string;
  successMessage: string;

  hasError = false;
  success = false;

  currentUser: any = {};
  isEditMode = false;

  searchId: string = '';
  searchEmail: string = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.hasError = false;
    this.subs.push(this.userService.getAllUsers().subscribe((users: any) => {
      this.users = users;
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }


  editUser(user: any) {
    this.currentUser = { ...user };
    this.isEditMode = true;
  }
  filteredUsers(): any[] {
    return this.users.filter(user => {
      const matchesId = user.id.toString().includes(this.searchId);
      const matchesEmail = user.email.toString().includes(this.searchEmail);

      return matchesId && matchesEmail ;
    });
  }
  updateUser(userForm: NgForm) {
    if (!userForm.valid) {
      return;
    }

    const updatedUser = userForm.value;
    updatedUser.id = this.currentUser.id;

    this.userService.updateUser(updatedUser).subscribe(
      (updatedUsers: any[]) => {
        this.users = updatedUsers;
        this.isEditMode = false;
        userForm.reset();
        this.success = true;
        this.successMessage = 'User updated successfully!';
        setTimeout(() => this.success = false, 3000);
      },
      error => {
        console.error('Error updating user:', error);
        this.hasError = true;
        this.errorMessage = 'Failed to update user.';
        setTimeout(() => this.hasError = false, 3000);
      }
    );
  }

  cancelEdit() {
    this.isEditMode = false;
    this.currentUser = {};
  }

  addUser(userForm: NgForm) {
    if (!userForm.valid) {
      return;
    }

    const newUser = userForm.value;
    this.userService.addUser(newUser).subscribe(
      (updatedUsers: any[]) => {
        this.users = updatedUsers;
        userForm.reset();
        this.success = true;
        this.successMessage = 'User added successfully!';
        setTimeout(() => this.success = false, 3000);
      },
      error => {
        console.error('Error adding user:', error);
        this.hasError = true;
        this.errorMessage = 'Failed to add user.';
        setTimeout(() => this.hasError = false, 3000);
      }
    );
  }

  deleteUser(id: number): void {
    this.subs.push(this.userService.deleteUser(id).subscribe(
      res => {
        if (res.status === 'failure') {
          this.hasError = true;
          this.errorMessage = res.message;
        }

        if (res.status === 'success') {
          this.success = true;
          this.successMessage = res.message;

        }

        this.users = res.users
        console.log(this.users);
        $('.alert').delay(1000).slideUp(1500);
      }
    ));
  }
}
