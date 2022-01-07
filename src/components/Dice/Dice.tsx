/* eslint-disable no-nested-ternary */
import React from 'react';
import classnames from 'classnames';
import styles from './Dice.module.scss';
import { DiceType } from '../../types/dice';

interface DiceProps {
  content: DiceType;
}

function Dice({ content }: DiceProps) {
  return (
    <div className={styles.base}>
      <div className={
        classnames({
          [styles[`number${content}`]]: typeof content === 'number',
          [styles.protect]: content === 'protect',
          [styles.back]: content === 'back',
        })
      }
      >
        {typeof content === 'number' ? content : (content === 'protect' ? 'P' : '?')}
      </div>
    </div>
  );
}

export default Dice;
