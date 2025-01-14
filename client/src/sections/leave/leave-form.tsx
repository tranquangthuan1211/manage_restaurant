import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Snackbar, Alert } from '@mui/material';
import { Leave } from 'src/types/leave';
import { apiPost } from 'src/api/api-requests';
import { useUser } from 'src/contexts/users/user-context';

interface PartialLeave {
  employeeId: string;
  from: string;
  to: string;
  reason: string;
}

const initialLeave = {
  employeeId: '',
  from: '',
  to: '',
  reason: '',
}

const LeaveForm: React.FC = () => {
  const { user, isAuthenticated } = useUser() || { user: null, isAuthenticated: false };
  console.log(JSON.stringify(user, null, 2), isAuthenticated)
  if (user === null || !isAuthenticated) {
    window.location.href = '/auth';
    return <div></div>;
  }

  const [leave, setLeave] = useState<PartialLeave>(initialLeave);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setLeave((prevLeave) => ({
        ...prevLeave,
        employeeId: user.id,
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeave((prevLeave) => ({
      ...prevLeave,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      leave.employeeId = user._id;
      console.log(JSON.stringify(leave, null, 2));
      const response = await apiPost('/leaves', leave);
      console.log('Response:', JSON.stringify(response, null, 2));
      if (response.acknowledged === true) {
        console.log('Leave request submitted: ', JSON.stringify(response.data, null, 2));
        setLeave(initialLeave);
        setSuccessMessage('Leave request submitted successfully.');
      } else {
        console.log('Error:', response.message);
        setError(response.message || 'An error occurred. Cannot submit leave request.');
      }
    } catch (error: any) {
      console.log('Error:', error.message || error);
      setError(error.message || 'An error occurred. Cannot submit leave request.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Create New Leave Request
      </Typography>
      <TextField
        label="From"
        name="from"
        type="date"
        value={leave.from.split('T')[0]}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="To"
        name="to"
        type="date"
        value={leave.to.split('T')[0]}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Reason"
        name="reason"
        value={leave.reason}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      )}
      {successMessage && (
        <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </Button>
    </Box>
  );
};

export default LeaveForm;