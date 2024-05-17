export interface IPet {
  id: string;
  name: string;
  level: number;
  expToLevelUp: number;
  bore: number;
  hunger: number;
  tiredness: number;
  dirtiness: number;
  owner: string | null;
}
