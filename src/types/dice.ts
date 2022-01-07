export type DiceNumberType = 1 | 2 | 3 | 4 | 5 | 6;
export type AdditionalDiceType = 'protect' | 'back';
export type DiceType = DiceNumberType | AdditionalDiceType;

export interface RollResultType {
  dices: DiceType[],
  boost: DiceNumberType[],
}
