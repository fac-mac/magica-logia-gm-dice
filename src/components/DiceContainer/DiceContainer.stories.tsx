import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DiceContainer from './DiceContainer';

export default {
  title: 'components/DiceContainer',
  component: DiceContainer,
} as ComponentMeta<typeof DiceContainer>;

const Template: ComponentStory<typeof DiceContainer> = (args) => <DiceContainer {...args} />;

export const Default = Template.bind({});
Default.args = {
  dices: [1, 2, 3, 4, 5, 6],
  boost: [1, 2, 3],
};

export const NoBoost = Template.bind({});
NoBoost.args = {
  dices: ['protect', 2, 3],
};
