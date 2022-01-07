/* eslint-disable react/no-array-index-key */
import React from 'react';
import Dice, { DiceNumberType, DiceType } from '../Dice/Dice';
import styles from './DiceContainer.module.scss';

interface DiceContainerProps {
  dices: DiceType[];
  boost?: DiceNumberType[];
}

function DiceContainer({ dices, boost }: DiceContainerProps) {
  return (
    <div className={styles.container}>
      <div className={styles.tray}>
        {dices.map((dice, idx) => <Dice key={idx} content={dice} />)}
      </div>
      {boost
      && (
        <>
          <p>+</p>
          <div className={styles.tray}>
            {boost.map((dice, idx) => <Dice key={idx} content={dice} />)}
          </div>

        </>
      )}
    </div>
  );
}

DiceContainer.defaultProps = {
  boost: null,
};

export default DiceContainer;
