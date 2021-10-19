import React from 'react';
import { useParams } from 'react-router-dom';
import Option from '../../general/option/Option';
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
import ItemTemplate from '../itemTemplate/ItemTemplate';
import ListItemCheck from '../../general/listItemCheck/ListItemCheck';
import './Metadata.scss';
import { evalMetadata } from '../../../services/evaluation.services';

const schema = yup.object().shape({
  [METADATA_SCHEMA]: yup.boolean(),
  [CLASSIFICATION_SYSTEM]: yup.boolean(),
  [CURATION]: yup.boolean(),
  [METADATA_EXPORT]: yup.boolean(),
});

const Metadata = () => {
  const { token } = useParams();

  return (
    <ItemTemplate
      item='metadata'
      title='Metadatos'
      wrapperClassName='metadata'
      prevRoute={legalAspectsRoute(token)}
      nextRoute={interoperabilityRoute(token)}
      form={{ schema }}
      evalFunc={evalMetadata}
      render={({ control, data }) => (
        <>
          <div className='two-col-content'>
            <Option
              label='Uso del esquema de metadatos Dublin Core (DC)'
              step={1}
              automatic
              value={data['dublin_core']}
            />
            <Option
              label='Inclusión de identificadores de autor (ORCID, IraLIS)'
              step={2}
              automatic
              value={data['author_id']}
            />
            <Option
              label='Inclusión de los siguientes campos:'
              text=''
              step={3}
              automatic
              value={data['first_fields']}
            >
              <ul>
                <ListItemCheck
                  text='Autor (dc:creator)'
                  showResult={!!data['first_fields']?.details}
                  pass={data['first_fields']?.details?.['DC.creator']}
                />
                <ListItemCheck
                  text='Título (dc:title)'
                  showResult={!!data['first_fields']?.details}
                  pass={data['first_fields']?.details?.['DC.title']}
                />
                <ListItemCheck
                  text='Tipo de resultado de investigación (dc:type)'
                  showResult={!!data['first_fields']?.details}
                  pass={data['first_fields']?.details?.['DC.type']}
                />
                <ListItemCheck
                  text='Versión del recurso (dc:type)'
                  showResult={!!data['first_fields']?.details}
                  pass={data['first_fields']?.details?.['DC.type']}
                />
                <ListItemCheck
                  text='Fecha de publicación (dc:date)'
                  showResult={!!data['first_fields']?.details}
                  pass={data['first_fields']?.details?.['DC.date']}
                />
                <ListItemCheck
                  text='Derechos de autor (dc:rights)'
                  showResult={!!data['first_fields']?.details}
                  pass={data['first_fields']?.details?.['DC.rights']}
                />
              </ul>
            </Option>
            <Option
              label='Inclusión de los siguientes campos:'
              step={4}
              automatic
              value={data['second_fields']}
            >
              <ul>
                <ListItemCheck
                  text='Descripción (dc:description)'
                  showResult={!!data['second_fields']?.details}
                  pass={data['second_fields']?.details?.['DC.description']}
                />
                <ListItemCheck
                  text='Formato (dc:format)'
                  showResult={!!data['second_fields']?.details}
                  pass={data['second_fields']?.details?.['DC.format']}
                />
                <ListItemCheck
                  text='Idioma (dc:language)'
                  showResult={!!data['second_fields']?.details}
                  pass={data['second_fields']?.details?.['DC.language']}
                />
                <ListItemCheck
                  text='Identificador (dc:identifier)'
                  showResult={!!data['second_fields']?.details}
                  pass={data['second_fields']?.details?.['DC.identifier']}
                />
                <ListItemCheck
                  text='Temática/descriptores/palabras clave (dc:subject)'
                  showResult={!!data['second_fields']?.details}
                  pass={data['second_fields']?.details?.['DC.subject']}
                />
                <ListItemCheck
                  text='Colaboración (dc:contributor)'
                  showResult={!!data['second_fields']?.details}
                  pass={data['second_fields']?.details?.['DC.contributor']}
                />
                <ListItemCheck
                  text='Referencia de financiación (dc:relation)'
                  showResult={!!data['second_fields']?.details}
                  pass={data['second_fields']?.details?.['DC.relation']}
                />
                <ListItemCheck
                  text='Editorial (dc:publisher)'
                  showResult={!!data['second_fields']?.details}
                  pass={data['second_fields']?.details?.['DC.publisher']}
                />
              </ul>
            </Option>
          </div>
          <Option
            label='El campo de derechos de acceso se encuentra conforme al vocabulario establecido'
            step={5}
            text='closedAccess, embargoedAccess, openAccess, restrictedAccess.'
            automatic
            value={data['standard_access_value']}
          />
          <Option
            step={6}
            label='El campo de fecha de publicación se encuentra conforme al formato establecido'
            text='ISO 8601 – AAAA-MM-DD, AAAA-MM-DDTHH:MM:SSZ'
            automatic
            value={data['standard_date_format']}
          />
          <Option
            step={7}
            label='El campo de idioma se encuentra conforme al vocabulario establecido'
            text='ISO 639-1, 639-2 y 639-3, código zxx'
            automatic
            value={data['standard_language']}
          />
          <div className='two-col-content'>
            <Option
              label='El campo tipo de resultado de investigación contiene una única ocurrencia'
              step={8}
              automatic
              value={data['single_type_research_result']}
            />
            <Option
              label='El campo tipo de resultado de investigación se asigna según el vocabulario de tipos de recursos de COAR'
              step={9}
              automatic
              value={['standard_type_research_result']}
            />
            <Option
              label='El campo de formato está asignado conforme al vocabulario establecido'
              step={10}
              automatic
              value={['standard_format']}
            />
            <Option
              label='El campo de versión del recurso contiene una única ocurrencia'
              step={11}
              automatic
              value={data['single_version']}
            />
            <Option
              label='El campo de versión del recurso se encuentra conforme al vocabulario COAR'
              text='draft, submittedVersion, acceptedVersion, publishedVersion, updatedVersion'
              step={12}
              automatic
              value={data['standard_version_coar']}
            />
          </div>
          <div className='two-col-content'>
            <Option
              label='Se aplica algún sistema de clasificación normalizado'
              step={13}
              text='(disposición de uno o varios sistemas de clasificación normalizados tales como CDU, JEL, UNESCO'
              value={data[CLASSIFICATION_SYSTEM]}
            >
              <RadioGroup control={control} name={CLASSIFICATION_SYSTEM} options={YES_NO_OPTIONS} />
            </Option>
            <Option
              label='Se utiliza algún esquema de metadatos técnicos y/o de preservación'
              step={14}
              value={data[METADATA_SCHEMA]}
            >
              <RadioGroup control={control} name={METADATA_SCHEMA} options={YES_NO_OPTIONS} />
            </Option>
            <Option
              label='El repositorio desarrolla alguna actividad de curación de metadatos'
              step={15}
              value={data[CURATION]}
            >
              <RadioGroup control={control} name={CURATION} options={YES_NO_OPTIONS} />
            </Option>
            <Option
              label='Exportación de metadatos a otro formato distinto de DC'
              step={16}
              value={data[METADATA_EXPORT]}
            >
              <RadioGroup control={control} name={METADATA_EXPORT} options={YES_NO_OPTIONS} />
            </Option>
          </div>
        </>
      )}
    />
  );
};

export default Metadata;
