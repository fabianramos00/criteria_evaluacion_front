import { StepControls } from '../../steps/Steps';
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
} from '../../../schemas/policies';
import * as yup from 'yup';
import { INVALID_URL_ERROR } from '../../../const/errors';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cleanJSON, getError } from '../../../utils/common';
import { evalPolitics } from '../../../services/evaluation.services';
import Option from '../../general/option/Option';
import { useState } from 'react';
import RadioWithUrl from '../../general/radioWithUrl/RadioWithUrl';
import ErrorMessage from '../../general/errorMessage/ErrorMessage';

const schema = yup.object().shape({
  [OPEN_ACCESS]: yup.boolean(),
  [OPEN_ACCESS_URL]: yup.string().url(INVALID_URL_ERROR),
  [METADATA_REUSE]: yup.boolean(),
  [METADATA_REUSE_URL]: yup.string().url(INVALID_URL_ERROR),
  [CONTENT_PRESERVATION]: yup.boolean(),
  [CONTENT_PRESERVATION_URL]: yup.string().url(INVALID_URL_ERROR),
  [DEPOSIT_DATA]: yup.boolean(),
  [DEPOSIT_DATA_URL]: yup.string().url(INVALID_URL_ERROR),
  [ACTION_POLICY]: yup.boolean(),
  [ACTION_POLICY_URL]: yup.string().url(INVALID_URL_ERROR),
  [POLICY_DATA]: yup.boolean(),
  [POLICY_DATA_URL]: yup.string().url(INVALID_URL_ERROR),
  [VISION_MISSION]: yup.boolean(),
  [VISION_MISSION_URL]: yup.string().url(INVALID_URL_ERROR),
  [CONTACT]: yup.boolean(),
  [CONTACT_URL]: yup.string().url(INVALID_URL_ERROR),
});

const Policies = () => {
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
    evalPolitics(token, body)
      .then(({ error }) => {
        if (error) setError(error);
        else setShowNext();
      })
      .finally(() => setLoading(false));
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Option step={1} label='Existencia de una política institucional de acceso abierto'>
          <RadioWithUrl
            radioName={OPEN_ACCESS}
            control={control}
            urlLabel='Enlace a la política'
            error={getError(errors, OPEN_ACCESS_URL)}
            {...register(OPEN_ACCESS_URL)}
          />
        </Option>
        <Option
          step={2}
          label='Adhesión a la declaración de Budapest, una de las fundacional del movimiento de acceso abierto'
          automatic
        />
        <Option
          step={3}
          label='Existencia de una política de actuación del RI (documento público unificado)'
        >
          <RadioWithUrl
            radioName={ACTION_POLICY}
            control={control}
            urlLabel='Enlace a la política'
            error={getError(errors, ACTION_POLICY_URL)}
            {...register(ACTION_POLICY_URL)}
          />
        </Option>
        <Option
          step={4}
          label='Existencia de información de la política de forma dispersa en el sitio del RI'
        >
          <RadioWithUrl
            radioName={POLICY_DATA}
            control={control}
            urlLabel='Enlace a la política'
            error={getError(errors, POLICY_DATA_URL)}
            {...register(POLICY_DATA_URL)}
          />
        </Option>
        <Option step={5} label='Indicación de misión y objetivos del RI'>
          <RadioWithUrl
            radioName={VISION_MISSION}
            control={control}
            urlLabel='Enlace a la misión y los objetivos'
            error={getError(errors, VISION_MISSION_URL)}
            {...register(VISION_MISSION_URL)}
          />
        </Option>
        <Option
          step={6}
          label='Indicación de quién puede depositar, qué se puede depositar y en qué formatos'
        >
          <RadioWithUrl
            radioName={DEPOSIT_DATA}
            control={control}
            urlLabel='Enlace'
            error={getError(errors, DEPOSIT_DATA_URL)}
            {...register(DEPOSIT_DATA_URL)}
          />
        </Option>
        <Option
          step={7}
          label='Indicación de cómo lleva adelante la preservación de los contenidos'
        >
          <RadioWithUrl
            radioName={CONTENT_PRESERVATION}
            control={control}
            urlLabel='Enlace a contenido de preservación'
            error={getError(errors, CONTENT_PRESERVATION_URL)}
            {...register(CONTENT_PRESERVATION_URL)}
          />
        </Option>
        <Option step={8} label='Indicación acerca de la reutilización de los metadatos'>
          <RadioWithUrl
            radioName={METADATA_REUSE}
            control={control}
            urlLabel='Enlace '
            error={getError(errors, METADATA_REUSE_URL)}
            {...register(METADATA_REUSE_URL)}
          />
        </Option>
        <Option step={9} label='Existencia de datos de contacto y/o asesoramiento visible'>
          <RadioWithUrl
            radioName={CONTACT}
            control={control}
            urlLabel='Enlace a datos de contacto'
            error={getError(errors, CONTACT_URL)}
            {...register(CONTACT_URL)}
          />
        </Option>
        <ErrorMessage message={error} />
        <StepControls
          backRoute={visibilityRoute(token)}
          nextRoute={legalAspectsRoute(token)}
          nextText={showNext}
          loading={loading}
        />
      </form>
    </section>
  );
};

export default Policies;
