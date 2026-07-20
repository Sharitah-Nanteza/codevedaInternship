// src/components/Modal.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect } from 'storybook/test';
import  { useState } from 'react';
import { Modal } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['ai-generated'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// A helper wrapper to manage open/close state inside Storybook dynamically
const ModalInteractiveWrapper = (props: any) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal Test</button>
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <p>This is an accessible modal component built for Level 3.</p>
      </Modal>
    </div>
  );
};

// 1. Standard Default Story
export const Default: Story = {
  render: (args) => <ModalInteractiveWrapper {...args} />,
  args: {
    title: 'Accessible System Dialog',
    isOpen: true,
    onClose: () => {},
    children: null
  },
};

// 2. REQUIRED: CssCheck Story (Fulfills Level 3 verification rules)
export const CssCheck: Story = {
  render: (args) => <ModalInteractiveWrapper {...args} />,
  args: {
    title: 'Style Validation Modal',
    isOpen: true,
    onClose: () => {},
    children: null
  },
  play: async ({ canvas }) => {
    // Finds the dialog container
    const dialog = canvas.getByRole('dialog');
    // Verifies that our CSS loaded successfully by asserting our background color
    await expect(getComputedStyle(dialog).backgroundColor).toBe('rgb(255, 255, 255)');
  },
};