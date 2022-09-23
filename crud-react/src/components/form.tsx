import { useFormik } from 'formik';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, TextField } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { queryClient } from '../pages/_app';
import { insertHero } from '../services/api';
import { IHero } from '../types';
import { validationHeroSchema } from '../utils/schema';

export const Form = () => {
  const heroesMutation = useMutation(
    (values: Omit<IHero, 'id'>) => insertHero(values),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['heroes'])
        setSubmitting(false)
        resetForm()
      }
    }
  )

  const {
    handleChange,
    handleSubmit,
    setSubmitting,
    touched,
    errors,
    values,
    isSubmitting,
    resetForm
  } = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validateOnBlur: true,
    validationSchema: validationHeroSchema,
    onSubmit: async (values) => heroesMutation.mutateAsync(values)
  })

  return (
    <Box
      onSubmit={handleSubmit}
      component="form"
      minWidth={300}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <TextField
        label="Name"
        placeholder="Your hero name"
        fullWidth
        variant="outlined"
        onChange={handleChange}
        value={values.name}
        name="name"
        error={touched.name && Boolean(errors.name)}
        helperText={touched.name && errors.name}
      />
      <TextField
        label="Description"
        placeholder="Your hero description"
        fullWidth
        variant="outlined"
        onChange={handleChange}
        value={values.description}
        error={touched.description && Boolean(errors.description)}
        helperText={touched.description && errors.description}
        name="description"
      />
      <LoadingButton
        loading={isSubmitting}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Add Hero
      </LoadingButton>
    </Box>
  )
}
