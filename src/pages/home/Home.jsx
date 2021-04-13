import './Home.scss';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { evaluate } from '../../services/home.services';
import * as yup from 'yup';

const schema = yup.object().shape({
  link: yup.string().required('Completa este campo.'),
  name: yup.string().required('Completa este campo.'),
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

  const onSubmit = ({ link, name }) => {
    evaluate(link, name).then(() => history.push('/eval'));
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
        <input {...register('link')} placeholder='Enlace al repositorio' />
        <span className='home__error'>{errors.link?.message}</span>
        <input {...register('name')} placeholder='Nombre del repositorio' />
        <span className='home__error'>{errors.name?.message}</span>
        <button type='submit' className='home__submit'>
          Evaluar
        </button>
      </form>
    </div>
  );
}

export default Home;
