import { legalAspectsRoute, visibilityRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';
import {
  OPEN_ACCESS,
  ACTION_POLICY,
  CONTACT,
  CONTACT_URL,
  CONTENT_PRESERVATION,
  DEPOSIT_DATA,
  METADATA_REUSE,
  OPEN_ACCESS_URL,
  POLICY_DATA,
  VISION_MISSION,
  ACTION_POLICY_URL,
  CONTENT_PRESERVATION_URL,
  DEPOSIT_DATA_URL,
  METADATA_REUSE_URL,
  POLICY_DATA_URL,
  VISION_MISSION_URL,
  BOAI,
} from '../../../schemas/policies';
import * as yup from 'yup';
import { INVALID_URL_ERROR, REQUIRED_FIELD_ERROR } from '../../../const/errors';
import { getError } from '../../../utils/common';
import { evalPolitics } from '../../../services/evaluation.services';
import Option from '../../general/option/Option';
import RadioWithUrl from '../../general/radioWithUrl/RadioWithUrl';
import ItemTemplate from '../itemTemplate/ItemTemplate';
import { YES_NO_OPTIONS } from '../../../const/common';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import './Polocies.scss';

const schema = yup.object().shape({
  [OPEN_ACCESS]: yup.boolean(),
  [OPEN_ACCESS_URL]: yup.string().when(OPEN_ACCESS, {
    is: true,
    then: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
  [BOAI]: yup.boolean(),
  [METADATA_REUSE]: yup.boolean(),
  [METADATA_REUSE_URL]: yup.string().when(METADATA_REUSE, {
    is: true,
    then: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
  [CONTENT_PRESERVATION]: yup.boolean(),
  [CONTENT_PRESERVATION_URL]: yup.string().when(CONTENT_PRESERVATION, {
    is: true,
    then: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
  [DEPOSIT_DATA]: yup.boolean(),
  [DEPOSIT_DATA_URL]: yup.string().when(DEPOSIT_DATA, {
    is: true,
    then: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
  [ACTION_POLICY]: yup.boolean(),
  [ACTION_POLICY_URL]: yup.string().when(ACTION_POLICY, {
    is: true,
    then: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
  [POLICY_DATA]: yup.boolean(),
  [POLICY_DATA_URL]: yup.string().when(POLICY_DATA, {
    is: true,
    then: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
  [VISION_MISSION]: yup.boolean(),
  [VISION_MISSION_URL]: yup.string().when(VISION_MISSION, {
    is: true,
    then: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
  [CONTACT]: yup.boolean(),
  [CONTACT_URL]: yup.string().when(CONTACT, {
    is: true,
    then: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
});

const Policies = ({ ref }) => {
  const { token } = useParams();

  return (
    <ItemTemplate
      item='policy'
      title='Políticas'
      wrapperClassName='policies'
      prevRoute={visibilityRoute(token)}
      nextRoute={legalAspectsRoute(token)}
      evalFunc={evalPolitics}
      ref={ref}
      form={{
        schema,
        defaultValues: {
          [OPEN_ACCESS]: false,
          [ACTION_POLICY]: false,
          [BOAI]: false,
          [POLICY_DATA]: false,
          [VISION_MISSION]: false,
          [DEPOSIT_DATA]: false,
          [CONTENT_PRESERVATION]: false,
          [METADATA_REUSE]: false,
          [CONTACT]: false,
        },
      }}
      render={({ register, control, errors, data, disabled }) => (
        <Fields
          register={register}
          control={control}
          errors={errors}
          data={data}
          disabled={disabled}
        />
      )}
    />
  );
};

export const Fields = ({ register, control, errors = {}, data = {}, disabled = true }) => {
  return (
    <>
      <Option
        step={1}
        label='Existencia de una política institucional de acceso abierto'
        value={data[OPEN_ACCESS]}
      >
        <RadioWithUrl
          radioName={OPEN_ACCESS}
          control={control}
          urlLabel='Enlace a la política'
          error={getError(errors, OPEN_ACCESS_URL)}
          disabled={disabled}
          data={data[OPEN_ACCESS]}
          {...register(OPEN_ACCESS_URL)}
        />
      </Option>
      <Option
        step={2}
        label='Adhesión a la declaración de Budapest, una de las fundacionales del movimiento de acceso abierto'
        value={data[BOAI]}
      >
        <RadioGroup
          text=''
          options={YES_NO_OPTIONS}
          control={control}
          name={BOAI}
          error={getError(errors, BOAI)}
          disabled={disabled}
        />
      </Option>
      <div className='two-col-content'>
        <Option
          step={3}
          label='Existencia de una política de actuación del RI (documento público unificado)'
          value={data[ACTION_POLICY]}
        >
          <RadioWithUrl
            radioName={ACTION_POLICY}
            control={control}
            urlLabel='Enlace a la política'
            error={getError(errors, ACTION_POLICY_URL)}
            disabled={disabled}
            data={data[ACTION_POLICY]}
            {...register(ACTION_POLICY_URL)}
          />
        </Option>
        <Option
          step={4}
          label='Existencia de información de la política de forma dispersa en el sitio del RI'
          value={data[POLICY_DATA]}
        >
          <RadioWithUrl
            radioName={POLICY_DATA}
            control={control}
            urlLabel='Enlace a la política'
            error={getError(errors, POLICY_DATA_URL)}
            disabled={disabled}
            data={data[POLICY_DATA]}
            {...register(POLICY_DATA_URL)}
          />
        </Option>
        <Option
          step={5}
          label='Indicación de misión y objetivos del RI'
          value={data[VISION_MISSION]}
        >
          <RadioWithUrl
            radioName={VISION_MISSION}
            control={control}
            urlLabel='Enlace a la misión y los objetivos'
            error={getError(errors, VISION_MISSION_URL)}
            data={data[VISION_MISSION]}
            disabled={disabled}
            {...register(VISION_MISSION_URL)}
          />
        </Option>
        <Option
          step={6}
          label='Indicación de quién puede depositar, qué se puede depositar y en qué formatos'
          value={data[DEPOSIT_DATA]}
        >
          <RadioWithUrl
            radioName={DEPOSIT_DATA}
            control={control}
            urlLabel='Enlace'
            error={getError(errors, DEPOSIT_DATA_URL)}
            data={data[DEPOSIT_DATA]}
            disabled={disabled}
            {...register(DEPOSIT_DATA_URL)}
          />
        </Option>
        <Option
          step={7}
          label='Indicación de cómo lleva adelante la preservación de los contenidos'
          value={data[CONTENT_PRESERVATION]}
        >
          <RadioWithUrl
            radioName={CONTENT_PRESERVATION}
            control={control}
            urlLabel='Enlace a contenido de preservación'
            error={getError(errors, CONTENT_PRESERVATION_URL)}
            data={data[CONTENT_PRESERVATION]}
            disabled={disabled}
            {...register(CONTENT_PRESERVATION_URL)}
          />
        </Option>
        <Option
          step={8}
          label='Indicación acerca de la reutilización de los metadatos'
          value={data[METADATA_REUSE]}
        >
          <RadioWithUrl
            radioName={METADATA_REUSE}
            control={control}
            urlLabel='Enlace '
            error={getError(errors, METADATA_REUSE_URL)}
            data={data[METADATA_REUSE]}
            disabled={disabled}
            {...register(METADATA_REUSE_URL)}
          />
        </Option>
      </div>
      <Option
        step={9}
        label='Existencia de datos de contacto y/o asesoramiento visible'
        value={data[CONTACT]}
      >
        <RadioWithUrl
          radioName={CONTACT}
          control={control}
          urlLabel='Enlace a datos de contacto'
          error={getError(errors, CONTACT_URL)}
          data={data[CONTACT]}
          disabled={disabled}
          {...register(CONTACT_URL)}
        />
      </Option>
    </>
  );
};

export default Policies;
