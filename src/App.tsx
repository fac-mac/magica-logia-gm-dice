import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {
  FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup, TextField,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import DiceContainer from './components/DiceContainer/DiceContainer';
import { DiceNumberType, RollResultType } from './types/dice';
import { EnemyType, ModeType, TurnType } from './types/enemy';
import styles from './App.module.scss';
import ReadingCircle from './class/ReadingCircle';
import Enemy from './class/Enemy';
import 'react-toastify/dist/ReactToastify.css';

interface InfoType {
  turn: TurnType;
  readingCircle: {
    booksField: DiceNumberType[];
  };
  enemy: EnemyType;
}

const initialInfo: InfoType = {
  turn: 'defence',
  readingCircle: {
    booksField: [],
  },
  enemy: {
    mode: 'random',
    offence: 3,
    defence: 3,
    boost: 0,
  },
};

function App() {
  const [isRolled, setRolled] = useState<boolean>(false);
  const [roll, setRoll] = useState<RollResultType | null>(null);
  const [info, setInfo] = useState<InfoType>(initialInfo);

  const handleRoll = () => {
    if (!isRolled) setRolled(true);
    try {
      const {
        mode, offence, defence, boost,
      } = info.enemy;
      const readingCircle = new ReadingCircle({ ...info.readingCircle });
      const enemy = new Enemy(mode, offence, defence, boost);
      setRoll(enemy.roll(info.turn, readingCircle));
    } catch (e) {
      toast.info(e.message);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!/^[0-9]*$/.test(e.target.value)) return;
    setInfo((prev) => ({
      ...prev,
      enemy: { ...prev.enemy, [e.target.name]: e.target.value },
    }));
  };

  const handleTurnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, turn: e.target.value as TurnType }));
  };

  const handleModeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo((prev) => ({ ...prev, enemy: { ...prev.enemy, mode: e.target.value as ModeType } }));
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.name);
    setInfo((prev) => ({
      ...prev,
      readingCircle: {
        booksField: e.target.checked ? prev.readingCircle.booksField.concat(num as DiceNumberType)
          : prev.readingCircle.booksField.filter((field) => field !== num),
      },
    }));
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={styles.container}>
        <div>
          <h1>마기카로기아 GM대리</h1>
          <FormLabel component="legend">GM 성향 결정</FormLabel>
          <RadioGroup
            aria-label="gm-play-bias"
            defaultValue="random"
            name="radio-buttons-group"
            className={styles.tray}
            value={info.enemy.mode}
            onChange={handleModeChange}
            row
          >
            <FormControlLabel value="random" control={<Radio />} label="랜덤" />
            <FormControlLabel value="severe" control={<Radio />} label="진심" />
            <FormControlLabel value="soft" control={<Radio />} label="상냥함" />
          </RadioGroup>
          <FormLabel component="legend" className={styles.margin}>분과회 장서 영역</FormLabel>
          <FormGroup row className={styles.tray}>
            <FormControlLabel
              control={(
                <Checkbox
                  name="1"
                  checked={info.readingCircle.booksField?.includes(1)}
                  onChange={handleFieldChange}
                />
              )}
              label="별"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  name="2"
                  checked={info.readingCircle.booksField?.includes(2)}
                  onChange={handleFieldChange}
                />
              )}
              label="짐승"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  name="3"
                  checked={info.readingCircle.booksField?.includes(3)}
                  onChange={handleFieldChange}
                />
              )}
              label="힘"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  name="4"
                  checked={info.readingCircle.booksField?.includes(4)}
                  onChange={handleFieldChange}
                />
              )}
              label="노래"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  name="5"
                  checked={info.readingCircle.booksField?.includes(5)}
                  onChange={handleFieldChange}
                />
              )}
              label="꿈"
            />
            <FormControlLabel
              control={(
                <Checkbox
                  name="6"
                  checked={info.readingCircle.booksField?.includes(6)}
                  onChange={handleFieldChange}
                />
              )}
              label="어둠"
            />
          </FormGroup>
          <FormLabel component="legend" className={styles.margin}>에너미 정보</FormLabel>
          <FormGroup row className={styles.inputTray}>
            <TextField
              id="outlined-basic"
              label="공격력"
              name="offence"
              variant="outlined"
              type="number"
              sx={{ width: '4em' }}
              value={info.enemy.offence}
              onChange={handleStatusChange}
              required
            />
            <TextField
              id="outlined-basic"
              label="방어력"
              name="defence"
              variant="outlined"
              type="number"
              sx={{ width: '4em' }}
              value={info.enemy.defence}
              onChange={handleStatusChange}
              required
            />
            +
            <TextField
              id="outlined-basic"
              label="부스트"
              name="boost"
              variant="outlined"
              type="number"
              sx={{ width: '4em' }}
              value={info.enemy.boost}
              onChange={handleStatusChange}
              required
            />
          </FormGroup>
          <FormLabel component="legend" className={styles.margin}>에너미 턴 정보</FormLabel>
          <RadioGroup
            aria-label="enemy-turn"
            defaultValue="defence"
            name="radio-buttons-group"
            className={styles.tray}
            value={info.turn}
            onChange={handleTurnChange}
            row
          >
            <FormControlLabel value="defence" control={<Radio />} label="방어" />
            <FormControlLabel value="offence" control={<Radio />} label="공격" />
          </RadioGroup>
          <Button variant="contained" type="button" sx={{ marginTop: '10px' }} onClick={handleRoll}>ROLL!</Button>
        </div>
        <div>
          {(isRolled && roll) && (
            <>
              <h2>Roll Result</h2>
              <DiceContainer dices={roll.dices} boost={roll.boost} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
