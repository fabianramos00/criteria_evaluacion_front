import { useParams } from 'react-router-dom';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import { StepControls } from '../../steps/Steps';
import { servicesRoute, securityRoute } from '../../../const/routes';
import Option from '../../general/option/Option';
import RadioWithUrl from '../../general/radioWithUrl/RadioWithUrl';
import { YES_NO_OPTIONS } from '../../../const/common';
import './Statistics.scss';

const Statistics = () => {
  const { token } = useParams();

  return (
    <section className='statistics'>
      <h1 className='main-title'>Estadísticas y logs</h1>
      <div className='two-col-content'>
        <Option label='Disponibilidad de estadísticas públicas del RI en general' step={1}>
          <RadioWithUrl urlLabel='Enlace a estadísticas' />
        </Option>
        <Option
          label='Disponibilidad de estadísticas públicas de cada documento depositado en el RI'
          step={2}
          automatic
        />
        <Option
          label='Los logs del servidor web donde está alojado el repositorio se archivan de forma permanente'
          step={3}
        >
          <RadioGroup options={YES_NO_OPTIONS} />
        </Option>
        <Option label='Utilización del estándar COUNTER' step={4}>
          <RadioGroup options={YES_NO_OPTIONS} />
        </Option>
      </div>
      <StepControls backRoute={securityRoute(token)} nextRoute={servicesRoute(token)} />
    </section>
  );
};

export default Statistics;
