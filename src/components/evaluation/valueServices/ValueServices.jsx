import { useParams } from 'react-router-dom';
import Option from '../../general/option/Option';
import { YES_NO_OPTIONS } from '../../../const/common';
import RadioWithUrl from '../../general/radioWithUrl/RadioWithUrl';
import ItemTemplate from '../itemTemplate/ItemTemplate';
import { evalServices } from '../../../services/evaluation.services';
import { statsRoute } from '../../../const/routes';
import * as yup from 'yup';
import {
  RSS_ALERT,
  AUTHOR_PROFILES,
  AUTHOR_PROFILES_URL,
  CITE_METRICS,
  NEW_METRICS,
  NEW_METRICS_URL,
  SOCIAL_NETWORKS,
  BIBLIOGRAPHIC_MANAGERS,
  METADATA_EXPORTS,
} from '../../../schemas/valueServices';
import { INVALID_URL_ERROR } from '../../../const/errors';
import { getError } from '../../../utils/common';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import './ValueServices.scss';

const schema = yup.object().shape({
  [RSS_ALERT]: yup.boolean(),
  [AUTHOR_PROFILES]: yup.boolean(),
  [AUTHOR_PROFILES_URL]: yup.string().url(INVALID_URL_ERROR),
  [CITE_METRICS]: yup.boolean(),
  [NEW_METRICS]: yup.boolean(),
  [NEW_METRICS_URL]: yup.string().url(INVALID_URL_ERROR),
});

const ValueServices = () => {
  const { token } = useParams();

  return (
    <ItemTemplate
      lastItem
      item='services'
      title='Servicios de valor añadido'
      evalFunc={evalServices}
      hasNext={false}
      prevRoute={statsRoute(token)}
      form={{
        schema,
        defaultValues: {
          [RSS_ALERT]: false,
          [AUTHOR_PROFILES]: false,
          [CITE_METRICS]: false,
          [NEW_METRICS]: false,
        },
      }}
      render={({ register, control, errors, data, disabled }) => (
        <div className='two-col-content'>
          <Option
            label='Uso de redes sociales para compartir cada documento'
            step={1}
            automatic
            value={data[SOCIAL_NETWORKS]}
          />
          <Option
            label='Integración con gestores bibliográficos'
            step={2}
            automatic
            text='Zotero, Mendeley, entre otras'
            value={data[BIBLIOGRAPHIC_MANAGERS]}
          />
          <Option
            label='Visualización/exportación de los metadatos en diferentes esquemas'
            step={3}
            text='METS, PREMIS, RDF, JSON, MARC, BibTeX, entre otros'
            automatic
            value={data[METADATA_EXPORTS]}
          />
          <Option
            label='Disponibilidad de servicios de alerta (RSS)'
            step={4}
            value={data[RSS_ALERT]}
          >
            <RadioGroup
              control={control}
              name={RSS_ALERT}
              options={YES_NO_OPTIONS}
              disabled={disabled}
            />
          </Option>
          <Option label='Existencia de perfiles de autor' step={5} value={data[AUTHOR_PROFILES]}>
            <RadioWithUrl
              urlLabel='Enalce a los perfiles'
              control={control}
              error={getError(errors, AUTHOR_PROFILES_URL)}
              radioName={AUTHOR_PROFILES}
              disabled={disabled}
              {...register(AUTHOR_PROFILES_URL)}
            />
          </Option>
          <Option
            label='El repositorio ofrece métricas basadas en citas'
            step={6}
            value={data[CITE_METRICS]}
          >
            <RadioGroup
              control={control}
              name={CITE_METRICS}
              options={YES_NO_OPTIONS}
              disabled={disabled}
            />
          </Option>
          <Option
            label='Métricas de nueva generación (como el índice H)'
            step={7}
            value={data[NEW_METRICS]}
          >
            <RadioWithUrl
              urlLabel='Enlace a las métricas'
              control={control}
              error={getError(errors, NEW_METRICS_URL)}
              radioName={NEW_METRICS}
              disabled={disabled}
              {...register(NEW_METRICS_URL)}
            />
          </Option>
        </div>
      )}
    />
  );
};

export default ValueServices;
