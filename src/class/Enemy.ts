import { DiceNumberType, DiceType, RollResultType } from '../types/dice';
import { ModeType, TurnType } from '../types/enemy';
import ReadingCircle from './ReadingCircle';

function getRandomDice(pool?: DiceNumberType[], isExclusive: boolean = false): DiceNumberType {
  if (pool) {
    if (isExclusive) {
      let number = getRandomDice();
      while (pool.includes(number)) {
        number = getRandomDice();
      }
      return number;
    }
    return pool[Math.floor(Math.random() * pool.length)];
  }
  return (Math.floor(Math.random() * (5)) + 1) as DiceNumberType;
}

export default class Enemy {
  mode: ModeType = 'random';

  offence: number = 3;

  defence: number = 3;

  boost: number = 0;

  additionalDamage: number = 0;

  constructor({
    mode = 'random',
    offence = 3,
    defence = 3,
    boost = 0,
    additionalDamage = 0,
  }: Enemy) {
    if (offence < 1 || defence < 1 || boost < 0 || additionalDamage < 0) {
      throw new Error('부적절한 값이 입력되었습니다.');
    }
    this.mode = mode;
    this.offence = offence;
    this.defence = defence;
    this.boost = boost;
    this.additionalDamage = additionalDamage;
  }

  severeRoll(turn: TurnType, readingCircle: ReadingCircle): RollResultType {
    const dices: DiceType[] = [];
    const boost: DiceNumberType[] = [];
    if (turn === 'defence') {
      if (Math.random() > 0.5 && this.defence > 2) { // 집중방어
        while (dices.length < this.defence - 2) {
          dices.push('protect');
        }
        while (dices.length < this.defence) {
          dices.push(getRandomDice());
        }
      } else { // 랜덤방어
        while (dices.length < this.defence) {
          dices.push(getRandomDice());
        }
      }
    }
    if (turn === 'offence') {
      if (Math.random() < 0.2) { // 랜덤플롯
        dices.fill(getRandomDice(), 0, this.offence);
      } else {
        const isExclusive = Math.random() < 0.7; // true면 장서 영역 제외
        if (Math.random() < 0.5) { // 한 다이스로 밀기
          dices.fill(getRandomDice(readingCircle.booksField, isExclusive), 0, this.offence);
        } else { // 랜덤
          while (dices.length < this.offence) {
            dices.push(getRandomDice(readingCircle.booksField, isExclusive));
          }
        }
      }
    }
    if (this.boost > 0) {
      while (dices.length < this.boost) {
        dices.push(getRandomDice());
      }
    }
    return { dices, boost };
  }

  softRoll(turn: TurnType, readingCircle: ReadingCircle): RollResultType {
    const dices: DiceType[] = [];
    const boost: DiceNumberType[] = [];
    if (turn === 'defence') { // 랜덤방어
      while (dices.length < this.defence) {
        dices.push(getRandomDice());
      }
    }
    if (turn === 'offence') {
      if (Math.random() < 0.8) { // 랜덤플롯
        dices.fill(getRandomDice(), 0, this.offence);
      } else {
        const isExclusive = Math.random() < 0.5; // true면 장서 영역 제외
        while (dices.length < this.offence) {
          dices.push(getRandomDice(readingCircle.booksField, isExclusive));
        }
      }
    }
    if (this.boost > 0) {
      while (dices.length < this.boost) {
        dices.push(getRandomDice());
      }
    }
    return { dices, boost };
  }

  roll(turn: TurnType, readingCircle: ReadingCircle): RollResultType {
    switch (this.mode) {
      case 'random':
        return (Math.random() > 0.5
          ? this.severeRoll(turn, readingCircle)
          : this.softRoll(turn, readingCircle));
      case 'severe':
        return (this.severeRoll(turn, readingCircle));
      case 'soft':
      default:
        return (this.softRoll(turn, readingCircle));
    }
  }
}
