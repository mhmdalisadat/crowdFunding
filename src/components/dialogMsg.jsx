import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import PropTypes from 'prop-types';

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'تایید حذف',
  message = 'آیا مطمئن هستید که می‌خواهید این بخش را حذف کنید؟',
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ textAlign: 'center' }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          انصراف
        </Button>
        <Button onClick={onConfirm} color="error">
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
};


ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ConfirmationDialog;
