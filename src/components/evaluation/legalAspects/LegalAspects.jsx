import { policiesRoute, metadataRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import {
  AUTHOR_COPYRIGHT,
  AUTHOR_METADATA,
  AUTHOR_PERMISSION,
  AUTHOR_PERMISSION_URL,
  AUTHOR_PROPERTY,
  EDITORIAL_POLICY,
} from '../../../schemas/legalAspects';
import { INVALID_URL_ERROR } from '../../../const/errors';
import Option from '../../general/option/Option';
import RadioWithUrl from '../../general/radioWithUrl/RadioWithUrl';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import { getError } from '../../../utils/common';
import { YES_NO_OPTIONS } from '../../../const/common';
import { evalLegalAspects } from '../../../services/evaluation.services';
import ItemTemplate from '../itemTemplate/ItemTemplate';
import './LegalAspects.scss';

const schema = yup.object().shape({
  [AUTHOR_PROPERTY]: yup.boolean(),
  [AUTHOR_PERMISSION]: yup.boolean(),
  [AUTHOR_PERMISSION_URL]: yup.string().url(INVALID_URL_ERROR),
  [EDITORIAL_POLICY]: yup.boolean(),
  [AUTHOR_COPYRIGHT]: yup.boolean(),
});

const LegalAspects = ({ ref }) => {
  const { token } = useParams();

  return (
    <ItemTemplate
      item='legal_aspects'
      title='Aspectos legales'
      prevRoute={policiesRoute(token)}
      nextRoute={metadataRoute(token)}
      ref={ref}
      form={{
        schema,
        defaultValues: {
          [AUTHOR_PROPERTY]: false,
          [AUTHOR_PERMISSION]: false,
          [EDITORIAL_POLICY]: false,
          [AUTHOR_COPYRIGHT]: false,
        },
      }}
      evalFunc={evalLegalAspects}
      render={({ register, control, errors, data, disabled }) => (
        <Fields
          register={register}
          control={control}
          data={data}
          errors={errors}
          disabled={disabled}
        />
      )}
    />
  );
};

export const Fields = ({ register, control, errors = {}, data = {}, disabled = false }) => {
  return (
    <div className='two-col-content'>
      <Option
        step={1}
        label='Exigencia al autor de reconocer que no está infringiendo ningún derecho de propiedad intelectual'
        value={data[AUTHOR_PROPERTY]}
      >
        <RadioGroup
          control={control}
          name={AUTHOR_PROPERTY}
          options={YES_NO_OPTIONS}
          disabled={disabled}
        />
      </Option>
      <Option
        label='Exigencia al autor de la firma de una autorización para la distribución de su obra'
        step={2}
        value={data[AUTHOR_PERMISSION]}
      >
        <RadioWithUrl
          radioName={AUTHOR_PERMISSION}
          urlLabel='Enlace'
          control={control}
          error={getError(errors, AUTHOR_PERMISSION || AUTHOR_PERMISSION_URL)}
          disabled={disabled}
          {...register(AUTHOR_PERMISSION_URL)}
        />
      </Option>
      <Option
        label='Mención de cómo puede hacer el autor para saber si su obra es depositable según política editorial (Sherpa/Romeo, Dulcinea, etc.)'
        step={3}
        value={data[EDITORIAL_POLICY]}
      >
        <RadioGroup
          control={control}
          name={EDITORIAL_POLICY}
          options={YES_NO_OPTIONS}
          disabled={disabled}
        />
      </Option>
      <Option
        label='Inclusión de los derechos de autor en los metadatos de cada recurso'
        step={4}
        automatic
        value={data[AUTHOR_METADATA]}
      />
      <Option
        label='Inclusión de los derechos de autor en cada recurso'
        step={5}
        value={data[AUTHOR_COPYRIGHT]}
      >
        <RadioGroup
          control={control}
          name={AUTHOR_COPYRIGHT}
          options={YES_NO_OPTIONS}
          disabled={disabled}
        />
      </Option>
    </div>
  );
};

export default LegalAspects;
