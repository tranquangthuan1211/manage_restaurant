import React from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LeaveForm from './leave-form';

interface LeavePanelProps {
  onClose: () => void;
}

const LeavePanel: React.FC<LeavePanelProps> = ({ onClose }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, position: 'relative' }}>
        <IconButton
          onClick={onClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h5" gutterBottom>
          Leave Management
        </Typography>
        <LeaveForm />
      </Paper>
    </Box>
  );
};

export default LeavePanel;