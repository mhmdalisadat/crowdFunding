

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, FormControlLabel, Checkbox, Box } from '@mui/material';

export default function ReferralCodeInput({ value, onChange }) {
  const [isEnabled, setIsEnabled] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsEnabled(event.target.checked);
    if (!event.target.checked) {
      onChange({ target: { value: '' } });
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <FormControlLabel
        control={<Checkbox checked={isEnabled} onChange={handleCheckboxChange} color="primary" />}
        label="استفاده از کد معرف"
      />
      {isEnabled && (
        <TextField
          value={value}
          onChange={onChange}
          label="کد معرف"
          variant="outlined"
          fullWidth
          helperText="لطفاً کد معرف خود را وارد کنید."
          sx={{ mt: 1 }}
        />
      )}
    </Box>
  );
}

ReferralCodeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
