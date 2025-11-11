export interface Stats {
  hp: number;
  atk: number;
  def: number;
  spe_atk: number;
  spe_def: number;
  vit: number;
}

export interface Talent {
  name: string;
  tc: boolean;
}

export interface Resistance {
  name: string;
  multiplier: number;
}

export interface SexeRate {
  male: number;
  female: number;
}

export interface PokemonDto {
  pokedex_id: number;
  generation: number;
  category: string;
  name: { fr: string; en: string; jp: string };
  sprites: {
    regular: string;
    shiny: string | null;
    gmax: {
      regular: string;
      shiny: string | null;
    } | null;
  };
  // types: PokemonType['id'][];
  types: number[];
  talents: Talent[];
  stats: Stats;
  resistances: Resistance[];
  evolution: {
    pre: { pokedex_id: number; name: string; condition: string }[];
    next: { pokedex_id: number; name: string; condition: string }[];
    mega: { orbe: string; sprites: { regular: string; shiny: string } }[];
  };
  height: string;
  weight: string;
  egg_groups: string[];
  sexe: SexeRate | null;
  catch_rate: number;
  level_100: number;
  formes: {
    region: string;
    name: { fr: string; en: string; jp: string };
  }[];
}
