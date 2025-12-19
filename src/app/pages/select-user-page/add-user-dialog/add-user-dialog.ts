import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatError, MatFormField, MatHint, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Field, form, max, min, minLength, pattern, required, validateHttp } from '@angular/forms/signals';
import { TrainerDTO } from '../../../services/api/trainer.dto';
import { PokemonsApi } from '../../../services/api/pokemons.api';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { MatProgressBar } from '@angular/material/progress-bar';

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
    MatSelect,
    MatOption,
    FormsModule,
    MatDialogActions,
    ReactiveFormsModule,
    Field,
    MatError,
    MatHint,
    MatProgressBar,
  ],
  templateUrl: './add-user-dialog.html',
  styleUrl: './add-user-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserDialog {
  private readonly pokemonsApi = inject(PokemonsApi);
  readonly dialogRef = inject(MatDialogRef<AddUserDialog>);

  // Type pour le formulaire avec favoritePokemon obligatoire (mais peut être 0 pour "aucun")
  private readonly initialTrainerData: Omit<TrainerDTO, 'id'> & { favoritePokemon: number } = {
    name: '',
    avatarUrl: '',
    description: '',
    age: undefined,
    hometown: '',
    level: 'beginner',
    favoritePokemon: 0, // 0 indique "pas de pokémon sélectionné"
  };

  readonly trainerModel = signal(this.initialTrainerData);

  trainerForm = form(this.trainerModel, (schemaPath) => {
    // Validation du nom : obligatoire et minimum 3 caractères
    required(schemaPath.name, { message: 'Le nom est obligatoire' });
    minLength(schemaPath.name, 3, { message: 'Le nom doit contenir au moins 3 caractères' });

    // Validation de l'URL de l'avatar : obligatoire (validation URL basique via type="url" dans le HTML)
    required(schemaPath.avatarUrl, { message: "L'URL de l'avatar est obligatoire" });
    pattern(schemaPath.avatarUrl, /^(https?:\/\/[^\s$.?#].\S*)$/i, {
      message: "L'URL de l'avatar n'est pas valide",
    });

    // Validation de la description : obligatoire et minimum 10 caractères
    required(schemaPath.description, { message: 'La description est obligatoire' });
    minLength(schemaPath.description, 10, {
      message: 'La description doit contenir au moins 10 caractères',
    });

    // Validation de l'âge : obligatoire et entre 10 et 100 ans
    required(schemaPath.age, { message: "L'âge est obligatoire" });
    min(schemaPath.age, 10, { message: "L'âge minimum est de 10 ans" });
    max(schemaPath.age, 100, { message: "L'âge maximum est de 100 ans" });

    // Validation de la ville natale : obligatoire et minimum 2 caractères
    required(schemaPath.hometown, { message: 'La ville natale est obligatoire' });
    minLength(schemaPath.hometown, 2, {
      message: 'La ville natale doit contenir au moins 2 caractères',
    });

    // Validation du niveau : obligatoire
    required(schemaPath.level, { message: 'Le niveau est obligatoire' });

    // Le Pokémon favori peut être 0 (aucun) ou un nombre positif
    min(schemaPath.favoritePokemon, 0, { message: 'Le Pokédex ID doit être 0 ou un nombre positif' });

    // Validation HTTP pour vérifier que le Pokémon existe via l'API
    validateHttp(schemaPath.favoritePokemon, {
      request: ({ value }) => {
        const pokemonId = value();
        // Si l'ID est 0, pas de validation nécessaire (aucun pokémon sélectionné)
        if (pokemonId === 0) {
          return undefined;
        }
        // Retourner l'URL pour la validation HTTP
        return `${this.pokemonsApi.resourceUrl}/${pokemonId}`;
      },
      onSuccess: () => null,
      onError: (error) => {
        if ((error as HttpErrorResponse).status === HttpStatusCode.NotFound) {
          return { kind: 'pokemonNotFound', message: "Ce Pokémon n'existe pas dans le Pokédex" };
        }
        return { kind: 'networkError', message: "Impossible de vérifier l'existence du Pokémon" };
      },
    });
  });

  /**
   * Récupère les données du formulaire au format TrainerDTO
   * Convertit favoritePokemon: 0 en undefined pour respecter le DTO
   */
  getTrainerData(): Omit<TrainerDTO, 'id'> {
    const formData = this.trainerModel();
    return {
      ...formData,
      favoritePokemon: formData.favoritePokemon === 0 ? undefined : formData.favoritePokemon,
    };
  }

  addTrainer(): void {
    this.dialogRef.close(this.getTrainerData());
  }
}
