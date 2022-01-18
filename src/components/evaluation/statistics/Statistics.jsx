import { useParams } from 'react-router-dom';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import Option from '../../general/option/Option';
import RadioWithUrl from '../../general/radioWithUrl/RadioWithUrl';
import { YES_NO_OPTIONS } from '../../../const/common';
import { evalStatistics } from '../../../services/evaluation.services';
import { securityRoute, servicesRoute } from '../../../const/routes';
import ItemTemplate from '../itemTemplate/ItemTemplate';
import {
  GENERAL_STATISTICS_URL,
  GENERAL_STATISTICS,
  COUNTER,
  SAVE_LOGS,
  URL_STATISTICS,
} from '../../../schemas/statistics';
import * as Yup from 'yup';
import './Statistics.scss';
import * as yup from 'yup';
import { INVALID_URL_ERROR } from '../../../const/errors';
import { getError } from '../../../utils/common';

const schema = Yup.object().shape({
  [GENERAL_STATISTICS]: Yup.boolean(),
  [GENERAL_STATISTICS_URL]: yup.string().url(INVALID_URL_ERROR),
  [COUNTER]: Yup.boolean(),
  [SAVE_LOGS]: Yup.boolean(),
});

const Statistics = ({ ref }) => {
  const { token } = useParams();

  return (
    <ItemTemplate
      item='statistics'
      evalFunc={evalStatistics}
      title='Estadísticas y logs'
      prevRoute={securityRoute(token)}
      nextRoute={servicesRoute(token)}
      ref={ref}
      form={{
        schema,
        defaultValues: { [GENERAL_STATISTICS]: false, [SAVE_LOGS]: false, [COUNTER]: false },
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

export const Fields = ({ register, control, errors = {}, data = {}, disabled = false }) => (
  <div className='two-col-content'>
    <Option
      label='Disponibilidad de estadísticas públicas del RI en general'
      step={1}
      value={data[GENERAL_STATISTICS]}
    >
      <RadioWithUrl
        urlLabel='Enlace a estadísticas'
        control={control}
        radioName={GENERAL_STATISTICS}
        error={getError(errors, GENERAL_STATISTICS_URL)}
        disabled={disabled}
        {...register(GENERAL_STATISTICS_URL)}
      />
    </Option>
    <Option
      label='Disponibilidad de estadísticas públicas de cada documento depositado en el RI'
      step={2}
      automatic
      value={data[URL_STATISTICS]}
    />
    <Option
      label='Los logs del servidor web donde está alojado el repositorio se archivan de forma permanente'
      step={3}
      value={data[SAVE_LOGS]}
    >
      <RadioGroup options={YES_NO_OPTIONS} control={control} name={SAVE_LOGS} disabled={disabled} />
    </Option>
    <Option label='Utilización del estándar COUNTER' step={4} value={data[COUNTER]}>
      <RadioGroup options={YES_NO_OPTIONS} control={control} name={COUNTER} disabled={disabled} />
    </Option>
  </div>
);

export default Statistics;
