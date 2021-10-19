import { StepControls } from '../../steps/Steps';
import { policiesRoute, metadataRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import * as yup from 'yup';
import {
  AUTHOR_COPYRIGHT,
  AUTHOR_PERMISSION,
  AUTHOR_PERMISSION_URL,
  AUTHOR_PROPERTY,
  EDITORIAL_POLICY,
} from '../../../schemas/legalAspects';
import { INVALID_URL_ERROR } from '../../../const/errors';
import Option from '../../general/option/Option';
import RadioWithUrl from '../../general/radioWithUrl/RadioWithUrl';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import { cleanJSON, getError } from '../../../utils/common';
import { YES_NO_OPTIONS } from '../../../const/common';
import ErrorMessage from '../../general/errorMessage/ErrorMessage';
import { evalLegalAspects } from '../../../services/evaluation.services';
import './LegalAspects.scss';
import ItemTemplate from '../itemTemplate/ItemTemplate';

const schema = yup.object().shape({
  [AUTHOR_PROPERTY]: yup.boolean(),
  [AUTHOR_PERMISSION]: yup.boolean(),
  [AUTHOR_PERMISSION_URL]: yup.string().url(INVALID_URL_ERROR),
  [EDITORIAL_POLICY]: yup.boolean(),
  [AUTHOR_COPYRIGHT]: yup.boolean(),
});

const LegalAspects = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [error, setError] = useState('');

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = values => {
    const body = cleanJSON(values);
    setLoading(true);
    evalLegalAspects(token, body)
      .then(({ error }) => {
        if (error) setError(error);
        else setShowNext();
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <ItemTemplate
        item='legal_aspects'
        title='Aspectos legales'
        prevRoute={policiesRoute(token)}
        nextRoute={metadataRoute(token)}
      />
      <section className='legal-aspects'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='two-col-content'>
            <Option
              step={1}
              label='Exigencia al autor de reconocer que no está infringiendo ningún derecho de propiedad intelectual'
            >
              <RadioGroup control={control} name={AUTHOR_PROPERTY} options={YES_NO_OPTIONS} />
            </Option>
            <Option
              label='Exigencia al autor de la firma de una autorización para la distribución de su obra'
              step={2}
            >
              <RadioWithUrl
                radioName={AUTHOR_PERMISSION}
                urlLabel='Enlace'
                error={getError(errors, AUTHOR_PERMISSION_URL)}
                {...register(AUTHOR_PERMISSION_URL)}
              />
            </Option>
            <Option
              label='Mención de cómo puede hacer el autor para saber si su obra es depositable según política editorial (Sherpa/Romeo, Dulcinea, etc.)'
              step={3}
            >
              <RadioGroup control={control} name={EDITORIAL_POLICY} options={YES_NO_OPTIONS} />
            </Option>
            <Option
              label='Inclusión de los derechos de autor en los metadatos de cada recurso'
              step={4}
              automatic
            />
            <Option label='Inclusión de los derechos de autor en cada recurso' step={5}>
              <RadioGroup control={control} name={AUTHOR_COPYRIGHT} options={YES_NO_OPTIONS} />
            </Option>
          </div>
          <ErrorMessage message={error} loading={loading} nextText={showNext} />
          <StepControls
            backRoute={policiesRoute(token)}
            nextRoute={metadataRoute(token)}
            loading={loading}
          />
        </form>
      </section>
    </>
  );
};

export default LegalAspects;
