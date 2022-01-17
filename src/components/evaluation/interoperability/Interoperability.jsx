import { useParams } from 'react-router-dom';
import Option from '../../general/option/Option';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import { YES_NO_OPTIONS } from '../../../const/common';
import ItemTemplate from '../itemTemplate/ItemTemplate';
import { metadataRoute, securityRoute } from '../../../const/routes';
import { evalInteroperability } from '../../../services/evaluation.services';
import {
  DELETED_RECORDS,
  ADMIN_EMAIL,
  IDENTIFY_DESCRIPTION,
  RECORDS_DATESTAMP,
  RECORDS_SIZE,
  LIFE_TIME,
  PROGRESSIVE_DELIVERY,
  SHARE_DATA,
  SYSTEMS_INTEGRATION,
  COLLECTOR,
  OAI_PMH,
  HEADERS_HTML,
  STANDARD_IDENTIFIER,
} from '../../../schemas/interoperability';
import * as yup from 'yup';
import './Interoperability.scss';

const schema = yup.object().shape({
  [DELETED_RECORDS]: yup.boolean(),
  [ADMIN_EMAIL]: yup.boolean(),
  [IDENTIFY_DESCRIPTION]: yup.boolean(),
  [RECORDS_DATESTAMP]: yup.boolean(),
  [RECORDS_SIZE]: yup.boolean(),
  [LIFE_TIME]: yup.boolean(),
  [PROGRESSIVE_DELIVERY]: yup.boolean(),
  [SHARE_DATA]: yup.boolean(),
  [SYSTEMS_INTEGRATION]: yup.boolean(),
});

const Interoperability = ({ ref }) => {
  const { token } = useParams();

  return (
    <ItemTemplate
      item='interoperability'
      title='Interoperabilidad'
      wrapperClassName='interoperability'
      prevRoute={metadataRoute(token)}
      nextRoute={securityRoute(token)}
      evalFunc={evalInteroperability}
      ref={ref}
      form={{
        schema,
        defaultValues: {
          [DELETED_RECORDS]: false,
          [LIFE_TIME]: false,
          [ADMIN_EMAIL]: false,
          [IDENTIFY_DESCRIPTION]: false,
          [PROGRESSIVE_DELIVERY]: false,
          [RECORDS_SIZE]: false,
          [RECORDS_DATESTAMP]: false,
          [SYSTEMS_INTEGRATION]: false,
          [SHARE_DATA]: false,
        },
      }}
      render={({ control, data, disabled }) => (
        <Fields data={data} control={control} disabled={disabled} />
      )}
    />
  );
};

export const Fields = ({ control, data = {}, disabled = false }) => (
  <>
    <div className='two-col-content'>
      <Option
        label='Recolectado por SNRD-LA Referencia-OpenAIRE'
        step={1}
        automatic
        value={data[COLLECTOR]}
      />
      <Option
        label='Se proveen los metadatos a través del protocolo OAI-PMH'
        step={2}
        automatic
        value={data[OAI_PMH]}
      />
    </div>
    <div className='two-col-content'>
      <Option label='Se marcan los registros eliminados' step={3} value={data[DELETED_RECORDS]}>
        <RadioGroup
          options={YES_NO_OPTIONS}
          control={control}
          name={DELETED_RECORDS}
          disabled={disabled}
        />
      </Option>
      <Option
        label='El tiempo de vida del testigo de reanudación es de un mínimo de veinticuatro horas'
        step={4}
        value={data[LIFE_TIME]}
      >
        <RadioGroup
          options={YES_NO_OPTIONS}
          control={control}
          name={LIFE_TIME}
          disabled={disabled}
        />
      </Option>
      <Option
        label='El correo electrónico del administrador del repositorio está disponible en la etiqueta AdminEmail dentro de la respuesta a una orden Identify'
        step={5}
        value={data[ADMIN_EMAIL]}
      >
        <RadioGroup
          options={YES_NO_OPTIONS}
          control={control}
          name={ADMIN_EMAIL}
          disabled={disabled}
        />
      </Option>
      <Option
        label='Existe una declaración de Description en la respuesta a una orden Identify'
        step={6}
        value={data[IDENTIFY_DESCRIPTION]}
      >
        <RadioGroup
          options={YES_NO_OPTIONS}
          control={control}
          name={IDENTIFY_DESCRIPTION}
          disabled={disabled}
        />
      </Option>
      <Option
        label='La entrega de registros a través del protocolo OAI-PMH es progresiva a través de lotes'
        step={7}
        value={data[PROGRESSIVE_DELIVERY]}
      >
        <RadioGroup
          options={YES_NO_OPTIONS}
          control={control}
          name={PROGRESSIVE_DELIVERY}
          disabled={disabled}
        />
      </Option>
      <Option
        label='El tamaño de los lotes para la entrega de registros está dentro del rango de 100-500 registros'
        step={8}
        value={data[RECORDS_SIZE]}
      >
        <RadioGroup
          options={YES_NO_OPTIONS}
          control={control}
          name={RECORDS_SIZE}
          disabled={disabled}
        />
      </Option>
      <Option
        label='El formato de la fecha expresado en la orden Identify coincide con el campo datestamp de los registros'
        step={9}
        value={data[RECORDS_DATESTAMP]}
      >
        <RadioGroup
          options={YES_NO_OPTIONS}
          control={control}
          name={RECORDS_DATESTAMP}
          disabled={disabled}
        />
      </Option>
      <Option
        label='Integración con otros sistemas de información de la institución'
        step={10}
        value={data[SYSTEMS_INTEGRATION]}
      >
        <RadioGroup
          options={YES_NO_OPTIONS}
          control={control}
          name={SYSTEMS_INTEGRATION}
          disabled={disabled}
        />
      </Option>
    </div>
    <Option
      label='Inclusión de etiquetas <meta…> en las cabeceras HTML '
      step={11}
      automatic
      value={data[HEADERS_HTML]}
    >
      <a
        href='https://scholar.google.com/intl/es/scholar/inclusion.html#indexing'
        target='_blank'
        rel='noreferrer'
        className='link'
      >
        https://scholar.google.com/intl/es/scholar/inclusion.html#indexing
      </a>
    </Option>
    <div className='two-col-content'>
      <Option
        label='El repositorio soporta otros protocolos y APIs para compartir metadatos y/o contenidos'
        step={12}
        value={data[SHARE_DATA]}
      >
        <RadioGroup
          options={YES_NO_OPTIONS}
          control={control}
          name={SHARE_DATA}
          disabled={disabled}
        />
      </Option>
      <Option
        label='Uso extendido de identificadores persistentes'
        text='DOI, Handle, URN, ORCID, entre otras'
        step={13}
        automatic
        value={data[STANDARD_IDENTIFIER]}
      />
    </div>
  </>
);

export default Interoperability;
