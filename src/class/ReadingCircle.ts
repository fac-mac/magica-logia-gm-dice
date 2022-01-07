import { DiceNumberType } from '../types/dice';

export default class ReadingCircle {
  booksField: DiceNumberType[] = [];

  representativeMP: number = 0;

  constructor(booksField: DiceNumberType[], representationMP: number) {
    this.booksField.concat(booksField);
    this.representativeMP = representationMP;
  }
}
