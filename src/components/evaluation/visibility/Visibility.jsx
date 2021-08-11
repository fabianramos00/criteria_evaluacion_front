import '../style.scss';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { INVALID_URL_ERROR } from '../../../const/errors';
import { yupResolver } from '@hookform/resolvers/yup';
import { StepControls } from '../../steps/Steps';
import { policiesRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import Option from '../../general/option/Option';

const schema = yup.object().shape({
  repository_url: yup.string().url(INVALID_URL_ERROR),
  repository_url1: yup.string().url(INVALID_URL_ERROR),
  repository_url2: yup.string().url(INVALID_URL_ERROR),
  repository_url3: yup.string().url(INVALID_URL_ERROR),
  repository_url4: yup.string().url(INVALID_URL_ERROR),
});

const Visibility = () => {
  const [national, setNational] = useState(0);
  const [showNext, setShowNext] = useState(false);
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
    <div className='visibility'>
      <Option
        label='Presencia en directorios internacionales'
        text='OpenDOAR, ROAR, OAI Data Providers, e3dat'
      />
      <Option
        step={2}
        label='Presencia en recolectores internacionales'
        text='La Referencia, OpenAIRE, Google Académico, CORE, BASE'
      />
      <Option step={3} label='Presencia en recolectores nacionales'>
        <RadioGroup
          text=''
          options={[
            { id: 1, label: 'Sí', value: 3 },
            { id: 2, label: 'No', value: 0 },
          ]}
          onChange={setNational}
        />
        {national > 0 && (
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
          </form>
        )}
      </Option>
      <Option
        step={4}
        label='Existencia de nombre normalizado del RI en directorios y recolectores'
      />
      <Option step={5} label='Existencia de URL segura (https) y amigable (nombre del RI)' />
      <Option step={6} label='Disponibilidad de documentos en acceso abierto' />
      <Option
        step={7}
        label='Existencia de iniciativas para fomentar la visibilidad del repositorio dentro de la propia institución'
      >
        <RadioGroup
          text=''
          options={[
            { id: 1, label: 'Sí', value: 3 },
            { id: 2, label: 'No', value: 0 },
          ]}
        />
      </Option>
      <StepControls showBack={false} nextRoute={policiesRoute(token)} nextText={showNext} />
    </div>
  );
};

export default Visibility;
