import * as yup from 'yup';

export const validationHeroSchema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must have at least 8 characters')
    .required('Name is required'),
  description: yup
    .string()
    .min(8, 'Write a description with at least 8 characters')
    .required('Description is required')
})
