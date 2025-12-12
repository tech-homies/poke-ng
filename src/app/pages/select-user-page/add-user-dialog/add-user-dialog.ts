import { Component, effect, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Field, form, minLength, required, validateHttp } from '@angular/forms/signals';

@Component({
  selector: 'app-add-user-card-dialog',
  imports: [
    MatButton,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatDialogActions,
    ReactiveFormsModule,
    Field,
    MatError,
  ],
  templateUrl: './add-user-dialog.html',
  styleUrl: './add-user-dialog.scss',
})
export class AddUserDialog {
  trainerModel = signal({
    name: '',
    description: '',
    birthDate: null as Date | null,
  });

  trainerForm = form(this.trainerModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    minLength(schemaPath.name, 3, { message: 'Name must be at least 3 characters long' });
    // validateHttp();
  });
}
