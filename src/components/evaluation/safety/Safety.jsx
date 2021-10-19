import RadioGroup from '../../general/radioGroup/RadioGroup';
import { StepControls } from '../../steps/Steps';
import { statsRoute, interoperabilityRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';
import RadioWithUrl from '../../general/radioWithUrl/RadioWithUrl';
import './Safety.scss';
import Option from '../../general/option/Option';
import { YES_NO_OPTIONS } from '../../../const/common';

const Safety = () => {
  const { token } = useParams();

  return (
    <section className='safety'>
      <h1 className='main-title'>Seguridad</h1>
      <div className='two-col-content'>
        <Option
          label='Mención en el sitio del RI de la realización de copias de seguridad'
          step={1}
        >
          <RadioWithUrl urlLabel='Enlace al sitio' />
        </Option>
        <Option
          label='Mención en el sitio del RI de la ejecución de sumas de verificación (checksum)'
          step={2}
        >
          <RadioWithUrl urlLabel='Enlace al sitio' />
        </Option>
        <Option
          label='Existen como mínimo tres copias de los registros (metadatos y ficheros) y, por lo menos, una de ellas está ubicada en una localización geográfica distinta'
          step={3}
        >
          <RadioGroup options={YES_NO_OPTIONS} />
        </Option>
        <Option
          label='Identificación, control y validación de formatos'
          text='JHOVE, DROID, Xena, entre otros'
          step={4}
        >
          <RadioGroup options={YES_NO_OPTIONS} />
        </Option>
      </div>
      <StepControls backRoute={interoperabilityRoute(token)} nextRoute={statsRoute(token)} />
    </section>
  );
};

export default Safety;
