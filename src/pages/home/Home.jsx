import './Home.scss';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { evaluate } from '../../services/home.services';
import * as yup from 'yup';
import { REQUIRED_FIELD_ERROR, INVALID_URL_ERROR } from '../../const/errors';

const schema = yup.object().shape({
  repository_url: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  repository_name: yup.string().required(REQUIRED_FIELD_ERROR),
  repository_name1: yup.string(),
  repository_name2: yup.string(),
});

function Home() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = values => {
    evaluate(values).then(() => history.push('/eval/TOKEN457DF'));
  };

  return (
    <div className='home'>
      <hr />
      <h2 className='home__title'>Evaluación de repositorios.</h2>
      <p>
        It is a long established fact that a reader will be distracted by the readable content of a
        page when looking at its layout. The point of using Lorem Ipsum is that it has a
        more-or-less normal distribution of letters, as opposed to using 'Content here,
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className='home__form'>
        <input {...register('repository_url')} placeholder='Enlace al repositorio' />
        <span className='home__error'>{errors.repository_url?.message}</span>
        <input {...register('repository_name')} placeholder='Nombre del repositorio' />
        <span className='home__error'>{errors.repository_name?.message}</span>
        <input {...register('repository_name1')} placeholder='Nombre del repositorio (opcional)' />
        <span className='home__error'>{errors.repository_name1?.message}</span>
        <input {...register('repository_name2')} placeholder='Nombre del repositorio (opcional)' />
        <span className='home__error'>{errors.repository_name2?.message}</span>
        <button type='submit' className='home__submit'>
          Evaluar
        </button>
      </form>
    </div>
  );
}

export default Home;
