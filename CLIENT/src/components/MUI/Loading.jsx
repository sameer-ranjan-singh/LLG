import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading() {
  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={0}>
      <LinearProgress/>
    </Stack>
  )
}
