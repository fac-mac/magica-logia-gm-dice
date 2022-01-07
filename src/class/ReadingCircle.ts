import { DiceNumberType } from '../types/dice';

export default class ReadingCircle {
  booksField: DiceNumberType[] = [];

  constructor({ booksField }: ReadingCircle) {
    this.booksField.concat(booksField);
  }
}
