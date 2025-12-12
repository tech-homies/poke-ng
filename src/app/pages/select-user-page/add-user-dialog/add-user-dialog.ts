import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Field, form, minLength, required } from '@angular/forms/signals';
import { PokemonDTO } from '../../../services/api/pokemonDTO';

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
    avatarUrl: '',
    description: '',
    age: 10,
    hometown: '',
    level: '' as '' | 'beginner' | 'intermediate' | 'advanced' | 'master',
    favoritePokemon: null as null | PokemonDTO['pokedex_id'],
  });

  trainerForm = form(this.trainerModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' });
    minLength(schemaPath.name, 3, { message: 'Name must be at least 3 characters long' });
    // validateHttp(); // TODO: check is pokemon exists
  });
}
