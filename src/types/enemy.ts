export type ModeType = 'severe' | 'soft' | 'random';

export type TurnType = 'offence' | 'defence';

export interface EnemyType {
  mode: ModeType;
  offence: number;
  defence: number;
  boost: number;
}
