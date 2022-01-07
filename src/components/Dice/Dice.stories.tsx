import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Dice from './Dice';

export default {
  title: 'components/Dice',
  component: Dice,
} as ComponentMeta<typeof Dice>;

const Template: ComponentStory<typeof Dice> = (args) => <Dice {...args} />;

export const One = Template.bind({});
One.args = {
  content: 1,
};

export const Several = () => (
  <>
    <Dice content={1} />
    <Dice content={2} />
    <Dice content={3} />
    <Dice content={4} />
    <Dice content={5} />
    <Dice content={6} />
    <Dice content="protect" />
    <Dice content="back" />
  </>
);
