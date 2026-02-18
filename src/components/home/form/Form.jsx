import { useState } from 'react';
import Input from '../../general/input/Input';
import { REPOSITORY_NAME, REPOSITORY_NAME_1, REPOSITORY_URL } from '../../../schemas/home';
import { getError, isEmptyObject } from '../../../utils/common';
import { URL_PLACEHOLDER } from '../../../const/common';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { evaluate } from '../../../services/home.services';
import { visibilityRoute } from '../../../const/routes';
import * as yup from 'yup';
import { INVALID_URL_ERROR, REQUIRED_FIELD_ERROR } from '../../../const/errors';

const schema = yup.object().shape({
  [REPOSITORY_URL]: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  [REPOSITORY_NAME]: yup.string().required(REQUIRED_FIELD_ERROR),
  [REPOSITORY_NAME_1]: yup.string()
    .test('not-equal', 'Nombre duplicado', function (value) {
      const { [REPOSITORY_NAME]: repoName } = this.parent;
      if (!value) return true;
      return value !== repoName;
    }),
});

const Form = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
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
          navigate(visibilityRoute(token));
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
      <div className='form-card'>
        <Input
          {...register(REPOSITORY_URL)}
          error={getError(errors, REPOSITORY_URL)}
          label='Enlace al repositorio'
          icon='link'
          placeholder={URL_PLACEHOLDER}
          required
        />
        <Input
          {...register(REPOSITORY_NAME)}
          error={getError(errors, REPOSITORY_NAME)}
          label='Nombre del repositorio'
          icon='label'
          placeholder='Ej: Repositorio Institucional Digital'
          required
        />
        <Input
          {...register(REPOSITORY_NAME_1)}
          label={
            <>
              Nombre alternativo
              <span className='optional-tag'>Opcional</span>
            </>
          }
          icon='work_outline'
          error={getError(errors, REPOSITORY_NAME_1)}
          placeholder='Ej: Proyecto v2'
        />
        <button type='submit' className='home__submit' disabled={loading}>
          {loading ? 'Cargando...' : (
            <>
              Evaluar repositorio
              <span className='material-icons-outlined'>chevron_right</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};


export default Form;
