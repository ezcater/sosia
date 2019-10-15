import React from 'react';
import {ThemeProvider} from 'emotion-theming';
import {
  themes,
  EzAppLayout,
  EzCard,
  EzPage,
  EzLayout,
  EzButton,
  EzField,
  EzFormLayout,
} from '@ezcater/recipe';
import injectFonts from './fonts';

injectFonts();

function App() {
  return (
    <ThemeProvider theme={themes.standard}>
      <EzAppLayout layout="centered">
        <EzPage>
          <EzCard title="Super important form">
            <EzFormLayout>
              <EzField
                type="text"
                label="Character Name"
                helperText="Provide the name of your favorite Sesame Street character."
              />
              <EzField
                type="time"
                value="9:00 am"
                start="9:00 am"
                end="5:00 pm"
                step={30}
                label="Select delivery time"
                placeholder="Choose..."
                helperText="This is the time your food will be delivered."
              />
              <EzLayout layout="right">
                <EzButton use="tertiary">Cancel</EzButton>
                <EzButton use="primary">Confirm</EzButton>
              </EzLayout>
            </EzFormLayout>
          </EzCard>
        </EzPage>
      </EzAppLayout>
    </ThemeProvider>
  );
}

export default App;
