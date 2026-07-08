import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas/loginSchema';
import { useLoginMutation } from '../api/authApi';

export function useLoginForm() {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const [form, setForm] = useState({ username: '', password: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [apiError, setApiError] = useState('');

  const updateField = (field:'username' | 'password', value: string) => {
    setForm((prev) => ({...prev, [field]: value}))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError('');

    const result = loginSchema.safeParse({ ...form, turnstileToken });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});

    try {
      await login({ username: form.username, password: form.password }).unwrap();
      navigate('/dashboard');
    } catch {
      setApiError('Invalid username or password');
    }
  };

  return {
    form,
    updateField,
    apiError,
    errors,
    setTurnstileToken,
    isLoading,
    handleSubmit,
  };
};