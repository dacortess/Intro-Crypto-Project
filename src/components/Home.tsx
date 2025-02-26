import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { GitHub } from '@mui/icons-material';

export const Home: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h1" 
          component="h1" 
          gutterBottom 
          sx={{ fontFamily: 'JetBrains Mono', fontWeight: 600 }}
        >
          Crypto Hub
        </Typography>
        <Typography 
          variant="h5" 
          color="white" 
          paragraph 
          sx={{ fontFamily: 'JetBrains Mono' }}
        >
          Project for Intro. Cryptography subject
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="white" 
          gutterBottom 
          sx={{ fontFamily: 'JetBrains Mono' }}
        >
          David Cortes - Juan Rueda
        </Typography>
        <Typography 
          variant="subtitle1" 
          color="white" 
          gutterBottom 
          sx={{ fontFamily: 'JetBrains Mono' }}
        >
          Universidad Nacional de Colombia
        </Typography>
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        justifyContent="center"
        sx={{ mb: 4 }}
      >
        <Button
          variant="contained"
          startIcon={<GitHub />}
          href="https://github.com/dacortess/Intro-Crypto-Project"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontFamily: 'JetBrains Mono' }}
        >
          Frontend Repository
        </Button>
        <Button
          variant="contained"
          startIcon={<GitHub />}
          href="https://github.com/dacortess/Intro-Crypto-Algorithms"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ fontFamily: 'JetBrains Mono' }}
        >
          Backend Repository
        </Button>
      </Stack>
    </Container>
  );
};