export type Origin = {
  name: string;
  url: string;
};

export type Location = {
  name: string;
  url: string;
};

export type Gender = 'female' | 'male' | 'genderless' | 'unknown';

export type Status = 'Alive' | 'Dead' | 'unknown';

export type Character = {
  id: number;
  name: string;
  status: Status;
  species: string;
  type: string;
  gender: Gender;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
};
