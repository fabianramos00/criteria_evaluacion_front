import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Option from '../../general/option/Option';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import { YES_NO_OPTIONS } from '../../../const/common';
import {
  METADATA_SCHEMA,
  CLASSIFICATION_SYSTEM,
  CURATION,
  METADATA_EXPORT,
} from '../../../schemas/metadata';
import * as yup from 'yup';
import { legalAspectsRoute, interoperabilityRoute } from '../../../const/routes';
import { StepControls } from '../../steps/Steps';
import ErrorMessage from '../../general/errorMessage/ErrorMessage';
import { cleanJSON } from '../../../utils/common';
import { evalMetadata } from '../../../services/evaluation.services';

const schema = yup.object().shape({
  [METADATA_SCHEMA]: yup.boolean(),
  [CLASSIFICATION_SYSTEM]: yup.boolean(),
  [CURATION]: yup.boolean(),
  [METADATA_EXPORT]: yup.boolean(),
});

const Metadata = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [error, setError] = useState('');

  const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = values => {
    const body = cleanJSON(values);
    setLoading(true);
    evalMetadata(token, body)
      .then(({ error }) => {
        if (error) setError(error);
        else setShowNext();
      })
      .finally(() => setLoading(false));
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Option label='Uso del esquema de metadatos Dublin Core (DC)' step={1} automatic />
        <Option label='Inclusión de identificadores de autor (ORCID, IraLIS)' step={2} automatic />
        <Option label='Inclusión de los siguientes campos:' text='' step={3} automatic>
          <ul>
            <li>Autor (dc:creator)</li>
            <li>Título (dc:title)</li>
            <li>Autor (dc:creator)</li>
            <li>Tipo de resultado de investigación (dc:type)</li>
            <li>Versión del recurso (dc:type)</li>
            <li>Derechos de autor (dc:rights)</li>
          </ul>
        </Option>
        <Option label='Inclusión de los siguientes campos:' step={4} automatic>
          <ul>
            <li>Descripción (dc:description)</li>
            <li>Formato (dc:format)</li>
            <li>Idioma (dc:language)</li>
            <li>Identificador (dc:identifier)</li>
            <li>Temática/descriptores/palabras clave (dc:subject)</li>
            <li>Colaboración (dc:contributor)</li>
            <li>Referencia de financiación (dc:relation)</li>
            <li>Editorial (dc:publisher)</li>
          </ul>
        </Option>
        <Option
          label='El campo de derechos de acceso se encuentra conforme al vocabulario establecido'
          step={5}
          text='closedAccess, embargoedAccess, openAccess, restrictedAccess.'
          automatic
        />
        <Option
          step={6}
          label='El campo de fecha de publicación se encuentra conforme al formato establecido'
          text='ISO 8601 – AAAA-MM-DD, AAAA-MM-DDTHH:MM:SSZ'
          automatic
        />
        <Option
          step={7}
          label='El campo de idioma se encuentra conforme al vocabulario establecido'
          text='ISO 639-1, 639-2 y 639-3, código zxx'
          automatic
        />
        <Option
          label='El campo tipo de resultado de investigación contiene una única ocurrencia'
          step={8}
          automatic
        />
        <Option
          label='El campo tipo de resultado de investigación se asigna según el vocabulario de tipos de recursos de COAR'
          step={9}
          automatic
        />
        <Option
          label='El campo de formato está asignado conforme al vocabulario establecido'
          step={10}
          automatic
        />
        <Option
          label='El campo de versión del recurso contiene una única ocurrencia'
          step={11}
          automatic
        />
        <Option
          label='El campo de versión del recurso se encuentra conforme al vocabulario COAR'
          text='draft, submittedVersion, acceptedVersion, publishedVersion, updatedVersion'
          step={12}
          automatic
        />
        <Option
          label='Se aplica algún sistema de clasificación normalizado'
          step={13}
          text='(disposición de uno o varios sistemas de clasificación normalizados tales como CDU, JEL, UNESCO'
        >
          <RadioGroup control={control} name={CLASSIFICATION_SYSTEM} options={YES_NO_OPTIONS} />
        </Option>
        <Option
          label='Se utiliza algún esquema de metadatos técnicos y/o de preservación'
          step={14}
        >
          <RadioGroup control={control} name={METADATA_SCHEMA} options={YES_NO_OPTIONS} />
        </Option>
        <Option
          label='El repositorio desarrolla alguna actividad de curación de metadatos'
          step={15}
        >
          <RadioGroup control={control} name={CURATION} options={YES_NO_OPTIONS} />
        </Option>
        <Option label='Exportación de metadatos a otro formato distinto de DC' step={16}>
          <RadioGroup control={control} name={METADATA_EXPORT} options={YES_NO_OPTIONS} />
        </Option>
        <ErrorMessage message={error} loading={loading} nextText={showNext} />
        <StepControls
          backRoute={legalAspectsRoute(token)}
          nextRoute={interoperabilityRoute(token)}
          loading={loading}
        />
      </form>
    </section>
  );
};

export default Metadata;
