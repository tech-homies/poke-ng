import { TrainerDTO } from './trainer.dto';

export type TeamDTO = {
  trainerId: TrainerDTO['id'];
  pokemons: number[];
};
