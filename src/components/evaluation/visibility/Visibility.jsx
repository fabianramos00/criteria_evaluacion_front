import '../style.scss';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { INVALID_URL_ERROR } from '../../../const/errors';
import { yupResolver } from '@hookform/resolvers/yup';
import { StepControls } from '../../steps/Steps';
import { policiesRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';

const schema = yup.object().shape({
  repository_url: yup.string().url(INVALID_URL_ERROR),
  repository_url1: yup.string().url(INVALID_URL_ERROR),
  repository_url2: yup.string().url(INVALID_URL_ERROR),
  repository_url3: yup.string().url(INVALID_URL_ERROR),
  repository_url4: yup.string().url(INVALID_URL_ERROR),
});

const Visibility = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { token } = useParams();

  const onSubmit = values => {
    console.log(values);
  };

  return (
    <>
      <h4>(opcional) Ingresa la url de hasta cinco recolectores nacionales.</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='visibility__form'>
          <div>
            <input {...register('repository_url')} placeholder='Repositorio nacional 1' />
            <p className='form__error'>{errors.repository_url?.message}</p>
          </div>
          <div>
            <input {...register('repository_url1')} placeholder='Repositorio nacional 2' />
            <p className='form__error'>{errors.repository_url1?.message}</p>
          </div>
          <div>
            <input {...register('repository_url2')} placeholder='Repositorio nacional 3' />
            <p className='form__error'>{errors.repository_url2?.message}</p>
          </div>
          <div>
            <input {...register('repository_url3')} placeholder='Repositorio nacional 4' />
            <p className='form__error'>{errors.repository_url3?.message}</p>
          </div>
          <div>
            <input {...register('repository_url4')} placeholder='Repositorio nacional 5' />
            <p className='form__error'>{errors.repository_url4?.message}</p>
          </div>
        </div>
        <StepControls showBack={false} nextRoute={policiesRoute(token)} />
      </form>
    </>
  );
};

export default Visibility;
