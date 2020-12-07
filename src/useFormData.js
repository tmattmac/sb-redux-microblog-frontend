import { useState } from 'react';

/** basic form logic */
const useFormData = (fields, defaults = {}) => {
  const initialState = Object.fromEntries(
    fields.map(field => [field, String(defaults[field] || '')])
  );

  const [formData, setFormData] = useState(initialState);

  const resetForm = () => setFormData(initialState);
  const updateFormData = (e) => {
    const { name, value } = e.target;
    setFormData(formData => {
      return { ...formData, [name]: value };
    });
  }

  return { formData, resetForm, updateFormData };
}

export default useFormData;