import '../style.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { INVALID_URL_ERROR } from '../../../const/errors';
import {
  NATIONAL_COLLECTOR,
  COLLECTOR_URL1,
  COLLECTOR_URL2,
  COLLECTOR_URL3,
  COLLECTOR_URL4,
  COLLECTOR_URL5,
  INITIATIVES_EXISTENCE,
} from '../../../schemas/visibility';
import { yupResolver } from '@hookform/resolvers/yup';
import { StepControls } from '../../steps/Steps';
import { policiesRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import Option from '../../general/option/Option';
import Input from '../../general/input/Input';
import { cleanJSON, getError } from '../../../utils/common';
import { URL_PLACEHOLDER, YES_NO_OPTIONS } from '../../../const/common';
import { evalVisibility } from '../../../services/evaluation.services';

const schema = yup.object().shape({
  [NATIONAL_COLLECTOR]: yup.boolean(),
  [COLLECTOR_URL1]: yup.string().url(INVALID_URL_ERROR),
  [COLLECTOR_URL2]: yup.string().url(INVALID_URL_ERROR),
  [COLLECTOR_URL3]: yup.string().url(INVALID_URL_ERROR),
  [COLLECTOR_URL4]: yup.string().url(INVALID_URL_ERROR),
  [COLLECTOR_URL5]: yup.string().url(INVALID_URL_ERROR),
  [INITIATIVES_EXISTENCE]: yup.boolean(),
});

const Visibility = () => {
  const [national, setNational] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const { token } = useParams();

  const onSubmit = values => {
    const body = cleanJSON(values);
    setLoading(true);
    evalVisibility(token, body)
      .then(data => {
        console.log(data);
        setShowNext();
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className='visibility'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Option
          step={1}
          label='Presencia en directorios internacionales'
          text='OpenDOAR, ROAR, OAI Data Providers, e3dat'
          automatic
        />
        <Option
          step={2}
          label='Presencia en recolectores internacionales'
          text='La Referencia, OpenAIRE, Google Académico, CORE, BASE'
          automatic
        />
        <Option step={3} label='Presencia en recolectores nacionales'>
          <RadioGroup
            options={YES_NO_OPTIONS}
            onChange={setNational}
            control={control}
            name={NATIONAL_COLLECTOR}
          />
          {national && (
            <div className='visibility__form'>
              <Input
                {...register(COLLECTOR_URL1)}
                error={getError(errors, COLLECTOR_URL1)}
                label='Enlace de recolector'
                placeholder={URL_PLACEHOLDER}
                required
              />
              <Input
                {...register(COLLECTOR_URL2)}
                error={getError(errors, COLLECTOR_URL2)}
                label='Enlace de recolector'
                placeholder={URL_PLACEHOLDER}
                required
              />
              <Input
                {...register(COLLECTOR_URL3)}
                error={getError(errors, COLLECTOR_URL3)}
                label='Enlace de recolector'
                placeholder={URL_PLACEHOLDER}
                required
              />
              <Input
                {...register(COLLECTOR_URL4)}
                error={getError(errors, COLLECTOR_URL4)}
                label='Enlace de recolector'
                placeholder={URL_PLACEHOLDER}
                required
              />
              <Input
                {...register(COLLECTOR_URL5)}
                error={getError(errors, COLLECTOR_URL5)}
                label='Enlace de recolector'
                placeholder={URL_PLACEHOLDER}
                required
              />
            </div>
          )}
        </Option>
        <Option
          step={4}
          label='Existencia de nombre normalizado del RI en directorios y recolectores'
          automatic
        />
        <Option
          step={5}
          label='Existencia de URL segura (https) y amigable (nombre del RI)'
          automatic
        />
        <Option step={6} label='Disponibilidad de documentos en acceso abierto' automatic />
        <Option
          step={7}
          label='Existencia de iniciativas para fomentar la visibilidad del repositorio dentro de la propia institución'
        >
          <RadioGroup
            text=''
            options={YES_NO_OPTIONS}
            control={control}
            name={INITIATIVES_EXISTENCE}
          />
        </Option>
        <StepControls
          showBack={false}
          nextRoute={policiesRoute(token)}
          nextText={showNext}
          loading={loading}
        />
      </form>
    </section>
  );
};

export default Visibility;
