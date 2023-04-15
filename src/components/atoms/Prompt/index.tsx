import React, { useState } from 'react';
import Dialog from 'react-native-dialog';

interface Props {
  title: string;
  visible: boolean;
  description?: string;
  onSubmit: (value: string) => void;
}

const Prompt = (props: Props) => {
  const [value, setValue] = useState<string>('');
  return (
    <Dialog.Container visible={props.visible}>
      <Dialog.Title>{props.title}</Dialog.Title>
      {props.description && (
        <Dialog.Description>{props.description}</Dialog.Description>
      )}
      <Dialog.Input onChangeText={(text) => setValue(text)} />
      <Dialog.Button label="OK" onPress={() => props.onSubmit(value)} />
    </Dialog.Container>
  );
}

export default Prompt;
