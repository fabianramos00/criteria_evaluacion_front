import '../style.scss';
import { useState } from 'react';
import * as yup from 'yup';
import { INVALID_URL_ERROR, REQUIRED_FIELD_ERROR } from '../../../const/errors';
import {
  NATIONAL_COLLECTOR,
  COLLECTOR_URL1,
  COLLECTOR_URL2,
  COLLECTOR_URL3,
  COLLECTOR_URL4,
  COLLECTOR_URL5,
  INITIATIVES_EXISTENCE,
} from '../../../schemas/visibility';
import { policiesRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import Option from '../../general/option/Option';
import Input from '../../general/input/Input';
import { getError } from '../../../utils/common';
import { URL_PLACEHOLDER, YES_NO_OPTIONS } from '../../../const/common';
import { evalVisibility } from '../../../services/evaluation.services';
import ItemTemplate from '../itemTemplate/ItemTemplate';

const schema = yup.object().shape({
  [NATIONAL_COLLECTOR]: yup.boolean().default(false),
  [COLLECTOR_URL1]: yup.string().when('national_collector', {
    is: true,
    then: yup.string().url(INVALID_URL_ERROR).required(REQUIRED_FIELD_ERROR),
  }),
  [COLLECTOR_URL2]: yup.string().url(INVALID_URL_ERROR),
  [COLLECTOR_URL3]: yup.string().url(INVALID_URL_ERROR),
  [COLLECTOR_URL4]: yup.string().url(INVALID_URL_ERROR),
  [COLLECTOR_URL5]: yup.string().url(INVALID_URL_ERROR),
  [INITIATIVES_EXISTENCE]: yup.boolean().default(false),
});

const Visibility = () => {
  const [national, setNational] = useState(false);

  const { token } = useParams();

  return (
    <ItemTemplate
      item='visibility'
      wrapperClassName='visibility'
      title='Visibilidad'
      hasPrev={false}
      nextRoute={policiesRoute(token)}
      form={{
        defaultValues: { [NATIONAL_COLLECTOR]: false, [INITIATIVES_EXISTENCE]: false },
        schema,
      }}
      evalFunc={evalVisibility}
      render={({ register, control, errors, data }) => (
        <>
          <div className='two-col-content'>
            <Option
              step={1}
              label='Presencia en directorios internacionales'
              text='OpenDOAR, ROAR, OAI Data Providers, re3data'
              automatic
              value={data.directory}
            />
            <Option
              step={2}
              label='Presencia en recolectores internacionales'
              text='La Referencia, OpenAIRE, Google Académico, CORE, BASE'
              automatic
              value={data.collector}
            />
          </div>
          <Option
            step={3}
            label='Presencia en recolectores nacionales'
            value={data.national_collector}
          >
            <RadioGroup
              options={YES_NO_OPTIONS}
              onChange={setNational}
              control={control}
              name={NATIONAL_COLLECTOR}
            />
            <div className={`collapse ${national ? 'open' : ''}`}>
              <Input
                {...register(COLLECTOR_URL1)}
                error={getError(errors, COLLECTOR_URL1)}
                label='Enlace de recolector'
                placeholder={URL_PLACEHOLDER}
                required
              />
              <Input
                {...register(COLLECTOR_URL2)}
                error={getError(errors, COLLECTOR_URL2)}
                label='Enlace de recolector'
                placeholder={URL_PLACEHOLDER}
              />
              <Input
                {...register(COLLECTOR_URL3)}
                error={getError(errors, COLLECTOR_URL3)}
                label='Enlace de recolector'
                placeholder={URL_PLACEHOLDER}
              />
              <Input
                {...register(COLLECTOR_URL4)}
                error={getError(errors, COLLECTOR_URL4)}
                label='Enlace de recolector'
                placeholder={URL_PLACEHOLDER}
              />
              <Input
                {...register(COLLECTOR_URL5)}
                error={getError(errors, COLLECTOR_URL5)}
                label='Enlace de recolector'
                placeholder={URL_PLACEHOLDER}
              />
            </div>
          </Option>
          <div className='two-col-content'>
            <Option
              step={4}
              label='Existencia de nombre normalizado del RI en directorios y recolectores'
              automatic
              value={data.standard}
            />
            <Option
              step={5}
              label='Existencia de URL segura (https) y amigable (nombre del RI)'
              automatic
              value={data.url}
            />
            <Option
              step={6}
              label='Disponibilidad de documentos en acceso abierto'
              automatic
              value={data.open_access}
            />
            <Option
              step={7}
              label='Existencia de iniciativas para fomentar la visibilidad del repositorio dentro de la propia institución'
              value={data.initiatives_existence}
            >
              <RadioGroup
                text=''
                options={YES_NO_OPTIONS}
                control={control}
                name={INITIATIVES_EXISTENCE}
                error={getError(errors, INITIATIVES_EXISTENCE)}
              />
            </Option>
          </div>
        </>
      )}
    />
  );
};

export default Visibility;
