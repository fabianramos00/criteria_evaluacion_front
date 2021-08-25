import '../style.scss';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { yupResolver } from '@hookform/resolvers/yup';
import { StepControls } from '../../steps/Steps';
import { policiesRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import Option from '../../general/option/Option';
import Input from '../../general/input/Input';
import { cleanJSON, getError } from '../../../utils/common';
import { URL_PLACEHOLDER, YES_NO_OPTIONS } from '../../../const/common';
import { evalVisibility } from '../../../services/evaluation.services';
import { TotalContext } from '../../../context/context';

const schema = yup.object().shape({
  [NATIONAL_COLLECTOR]: yup.boolean().default(false),
  [COLLECTOR_URL1]: yup.string().when('national_collector', {
    is: true,
    then: yup
      .string()
      .url(INVALID_URL_ERROR)
      .required(REQUIRED_FIELD_ERROR),
  }),
  [COLLECTOR_URL2]: yup.string().url(INVALID_URL_ERROR),
  [COLLECTOR_URL3]: yup.string().url(INVALID_URL_ERROR),
  [COLLECTOR_URL4]: yup.string().url(INVALID_URL_ERROR),
  [COLLECTOR_URL5]: yup.string().url(INVALID_URL_ERROR),
  [INITIATIVES_EXISTENCE]: yup.boolean().default(false),
});

const Visibility = () => {
  const [national, setNational] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState({} );
  const totalContext = useContext(TotalContext);

  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: { [NATIONAL_COLLECTOR]: false, [INITIATIVES_EXISTENCE]: false},
    resolver: yupResolver(schema),
  });
  const { token } = useParams();

  const onSubmit = values => {
    const body = cleanJSON(values);
    setLoading(true);
    evalVisibility(token, body)
      .then(data => {
        console.log(data.status);
        console.log(data.data);
        if (data.status === 200) {
          setResponse(data.data);
          totalContext.setTotal(data.data.accumulative);
          setShowResponse(true);
          setShowNext(true);
        } else if (data.status === 400) {
          Object.keys(data.data).forEach(key => {
            setError(key, {message: data.data[key]});
          });
        }
      })
      .finally(() => setLoading(false));
  };
  return (
    <section className='visibility'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Option
          step={1}
          label='Presencia en directorios internacionales'
          text='OpenDOAR, ROAR, OAI Data Providers, re3data'
          automatic
          value={response.directory}
        />
        <Option
          step={2}
          label='Presencia en recolectores internacionales'
          text='La Referencia, OpenAIRE, Google Académico, CORE, BASE'
          automatic
          value={response.collector}
        />
        <Option step={3} label='Presencia en recolectores nacionales'
                value={response.national_collector}>
          <RadioGroup
            options={YES_NO_OPTIONS}
            onChange={setNational}
            control={control}
            name={NATIONAL_COLLECTOR}
          />
          {national && (
            <div className='visibility__form'>
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
          )}
        </Option>
        <Option
          step={4}
          label='Existencia de nombre normalizado del RI en directorios y recolectores'
          automatic
          value={response.standard}
        />
        <Option
          step={5}
          label='Existencia de URL segura (https) y amigable (nombre del RI)'
          automatic
          value={response.url}
        />
        <Option step={6} label='Disponibilidad de documentos en acceso abierto' automatic evaluated={showResponse}
                value={response.open_access} />
        <Option
          step={7}
          label='Existencia de iniciativas para fomentar la visibilidad del repositorio dentro de la propia institución'
          value={response.initiatives_existence}
        >
          <RadioGroup
            text=''
            options={YES_NO_OPTIONS}
            control={control}
            name={INITIATIVES_EXISTENCE}
            error={getError(errors, INITIATIVES_EXISTENCE)}
          />
        </Option>
        <StepControls
          showBack={false}
          nextRoute={policiesRoute(token)}
          nextText={showNext}
          loading={loading}
          showTotal={showResponse}
          total={response.total}
        />
      </form>
    </section>
  );
};

export default Visibility;
