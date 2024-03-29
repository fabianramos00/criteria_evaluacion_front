import RadioGroup from '../../general/radioGroup/RadioGroup';
import { useParams } from 'react-router-dom';
import RadioWithUrl from '../../general/radioWithUrl/RadioWithUrl';
import Option from '../../general/option/Option';
import { YES_NO_OPTIONS } from '../../../const/common';
import ItemTemplate from '../itemTemplate/ItemTemplate';
import { evalSecurity } from '../../../services/evaluation.services';
import { interoperabilityRoute, statsRoute } from '../../../const/routes';
import {
  BACKUPS,
  BACKUPS_URL,
  BACKUPS_LOCATION,
  CHECKSUM,
  CHECKSUM_URL,
  FORMAT_CONTROL,
} from '../../../schemas/safety';
import './Safety.scss';
import { getError } from '../../../utils/common';
import * as yup from 'yup';
import { INVALID_URL_ERROR, REQUIRED_FIELD_ERROR } from '../../../const/errors';

const schema = yup.object().shape({
  [BACKUPS]: yup.boolean(),
  [BACKUPS_URL]: yup.string().when(BACKUPS, {
    is: true,
    then: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
  [BACKUPS_LOCATION]: yup.boolean(),
  [CHECKSUM]: yup.boolean(),
  [CHECKSUM_URL]: yup.string().when(CHECKSUM, {
    is: true,
    then: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
  [FORMAT_CONTROL]: yup.boolean(),
});

const Safety = ({ ref }) => {
  const { token } = useParams();

  return (
    <ItemTemplate
      item='security'
      evalFunc={evalSecurity}
      title='Seguridad'
      prevRoute={interoperabilityRoute(token)}
      nextRoute={statsRoute(token)}
      ref={ref}
      form={{
        schema,
        defaultValues: {
          [BACKUPS]: false,
          [CHECKSUM]: false,
          [BACKUPS_LOCATION]: false,
          [FORMAT_CONTROL]: false,
        },
      }}
      render={({ register, control, errors, data, disabled }) => (
        <Fields
          control={control}
          disabled={disabled}
          data={data}
          errors={errors}
          register={register}
        />
      )}
    />
  );
};

export const Fields = ({ register, control, errors = {}, data = {}, disabled = false }) => (
  <div className='two-col-content'>
    <Option
      label='Mención en el sitio del RI de la realización de copias de seguridad'
      step={1}
      value={data[BACKUPS]}
    >
      <RadioWithUrl
        urlLabel='Enlace al sitio'
        control={control}
        radioName={BACKUPS}
        error={getError(errors, BACKUPS_URL)}
        data={data[BACKUPS]}
        disabled={disabled}
        {...register(BACKUPS_URL)}
      />
    </Option>
    <Option
      label='Mención en el sitio del RI de la ejecución de sumas de verificación (checksum)'
      step={2}
      value={data[CHECKSUM]}
    >
      <RadioWithUrl
        radioName={CHECKSUM}
        control={control}
        urlLabel='Enlace al sitio'
        error={getError(errors, CHECKSUM_URL)}
        data={data[CHECKSUM]}
        disabled={disabled}
        {...register(CHECKSUM_URL)}
      />
    </Option>
    <Option
      label='Existen como mínimo tres copias de los registros (metadatos y ficheros) y, por lo menos, una de ellas está ubicada en una localización geográfica distinta'
      step={3}
      value={data[BACKUPS_LOCATION]}
    >
      <RadioGroup
        options={YES_NO_OPTIONS}
        control={control}
        name={BACKUPS_LOCATION}
        disabled={disabled}
      />
    </Option>
    <Option
      label='Identificación, control y validación de formatos'
      text='JHOVE, DROID, Xena'
      step={4}
      value={data[FORMAT_CONTROL]}
    >
      <RadioGroup
        options={YES_NO_OPTIONS}
        control={control}
        name={FORMAT_CONTROL}
        disabled={disabled}
      />
    </Option>
  </div>
);

export default Safety;
