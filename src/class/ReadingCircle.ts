import { DiceNumberType } from '../types/dice';

export default class ReadingCircle {
  booksField: DiceNumberType[] = [];

  constructor({ booksField }: ReadingCircle) {
    booksField.forEach((field) => this.booksField.push(field));
  }
}
