import { Box, Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { Form } from '../components/form';
import { List } from '../components/list';

import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Form />
        <List />
      </Box>
    </Container>
  )
}

export default Home
