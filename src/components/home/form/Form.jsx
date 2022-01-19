import { useState } from 'react';
import Input from '../../general/input/Input';
import { REPOSITORY_NAME, REPOSITORY_NAME_1, REPOSITORY_URL } from '../../../schemas/home';
import { getError, isEmptyObject } from '../../../utils/common';
import { URL_PLACEHOLDER } from '../../../const/common';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { evaluate } from '../../../services/home.services';
import { visibilityRoute } from '../../../const/routes';
import * as yup from 'yup';
import { INVALID_URL_ERROR, REQUIRED_FIELD_ERROR } from '../../../const/errors';

const schema = yup.object().shape({
  [REPOSITORY_URL]: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  [REPOSITORY_NAME]: yup.string().required(REQUIRED_FIELD_ERROR),
  [REPOSITORY_NAME_1]: yup.string().notOneOf(
    [yup.ref(REPOSITORY_NAME), null],
    'Nombre duplicado',
  ),
});

const Form = () => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = values => {
    setLoading(true);
    if (isEmptyObject(errors)) {
      evaluate(values)
        .then(({ token }) => {
          history.push(visibilityRoute(token));
        })
        .catch(e => {
          Object.keys(e).forEach(key => {
            setError(key, { message: e?.[key].join(', ') });
          });
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='form'>
      <Input
        {...register(REPOSITORY_URL)}
        error={getError(errors, REPOSITORY_URL)}
        label='Enlace al repositorio'
        placeholder={URL_PLACEHOLDER}
        required
      />
      <Input
        {...register(REPOSITORY_NAME)}
        error={getError(errors, REPOSITORY_NAME)}
        label='Nombre del repositorio'
        placeholder='Nombre'
        required
      />
      <Input
        {...register(REPOSITORY_NAME_1)}
        label='Nombre alternativo'
        error={getError(errors, REPOSITORY_NAME_1)}
        placeholder='Nombre del repositorio (opcional)'
      />
      <button type='submit' className='home__submit' disabled={loading}>
        {loading ? 'Cargando...' : 'Evaluar'}
      </button>
    </form>
  );
};

export default Form;
