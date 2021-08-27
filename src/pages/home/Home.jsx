import './Home.scss';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { evaluate } from '../../services/home.services';
import * as yup from 'yup';
import { REQUIRED_FIELD_ERROR, INVALID_URL_ERROR } from '../../const/errors';
import Input from '../../components/general/input/Input';
import {
  REPOSITORY_URL,
  REPOSITORY_NAME,
  REPOSITORY_NAME_1,
  REPOSITORY_NAME_2,
} from '../../schemas/home';
import { getError } from '../../utils/common';
import { visibilityRoute } from '../../const/routes';
import { URL_PLACEHOLDER } from '../../const/common';

const schema = yup.object().shape({
  [REPOSITORY_URL]: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  [REPOSITORY_NAME]: yup.string().required(REQUIRED_FIELD_ERROR),
  [REPOSITORY_NAME_1]: yup.string(),
  [REPOSITORY_NAME_2]: yup.string(),
});

function Home() {
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = values => {
    setLoading(true);
    evaluate(values)
      .then(({ token }) => {
        history.push(visibilityRoute(token));
      })
      .catch(e => console.log(e))
      .finally(() => setLoading(false));
  };

  return (
    <div className='home'>
      <h2 className='home__title'>Evaluación de repositorios.</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='home__form'>
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
        <Input
          {...register(REPOSITORY_NAME_2)}
          label='Nombre alternativo'
          error={getError(REPOSITORY_NAME_2)}
          placeholder='Nombre del repositorio (opcional)'
        />
        <button type='submit' className='home__submit' disabled={loading}>
          {loading ? 'Cargando...' : 'Evaluar'}
        </button>
      </form>
    </div>
  );
}

export default Home;
