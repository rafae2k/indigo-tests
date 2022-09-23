import { useFormik } from 'formik';
import { useState } from 'react';
import { useAsync } from 'react-async-hook';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    List as MaterialList, ListItem, ListItemText, TextField, Typography
} from '@mui/material';

import { deleteHeroById, getAllHeroes, updateHeroById } from '../services/api';
import { IHero } from '../types';
import { validationHeroSchema } from '../utils/schema';

export const List = () => {
  const [hero, setHero] = useState<IHero>()
  const [refetch, setRefetch] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSubmitForm = (values: IHero) => {
    if (hero) {
      updateHeroById(hero.id, values)
    }
    setSubmitting(false)
    resetForm()
    setOpen(false)
    setRefetch(!refetch)
  }

  const {
    handleChange,
    handleSubmit,
    setSubmitting,
    touched,
    errors,
    values,
    resetForm
  } = useFormik({
    // @ts-ignore
    initialValues: {
      name: '',
      description: ''
    },
    validateOnBlur: true,
    validationSchema: validationHeroSchema,
    onSubmit: handleSubmitForm
  })

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = (hero: IHero) => {
    deleteHeroById(hero.id)
    setRefetch(!refetch)
  }

  const heroes = useAsync(getAllHeroes, [refetch])

  return (
    <div>
      <MaterialList
        sx={{
          flexGrow: 1,
          maxWidth: '23rem',
          margin: '0 auto'
        }}
      >
        {heroes.result?.data.map((hero) => (
          <ListItem key={hero.id}>
            <ListItemText
              primary={hero.name}
              secondary={
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {hero.description}
                </Typography>
              }
            />

            <Button
              className="btn btn-warning mx-2"
              onClick={() => {
                setHero(hero)
                setOpen(true)
              }}
            >
              <EditIcon />
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => handleDelete(hero)}
            >
              <DeleteIcon />
            </Button>
          </ListItem>
        ))}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit your hero</DialogTitle>
          <Box onSubmit={handleSubmit} component="form">
            <DialogContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                minWidth: 300
              }}
            >
              <TextField
                sx={{ mt: 2 }}
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Edit hero</Button>
            </DialogActions>
          </Box>
        </Dialog>
      </MaterialList>
    </div>
  )
}
