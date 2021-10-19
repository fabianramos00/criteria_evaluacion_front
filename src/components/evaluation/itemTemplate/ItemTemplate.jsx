import { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItemEvaluation } from '../../../services/evaluation.services';
import { useForm } from 'react-hook-form';
import './ItemTemplate.scss';
import { yupResolver } from '@hookform/resolvers/yup';
import { cleanJSON, isEmptyObject } from '../../../utils/common';
import { TotalContext } from '../../../context/context';

const ItemTemplate = ({
  children,
  item = '',
  wrapperClassName = '',
  title = '',
  render,
  hasNext = true,
  hasPrev = true,
  nextRoute = '',
  prevRoute = '',
  form = { defaultValues: {}, schema: {} },
  evalFunc = () => {},
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { setTotal } = useContext(TotalContext);
  const { token } = useParams();
  const history = useHistory();

  const { defaultValues, schema } = form;

  const {
    handleSubmit,
    register,
    control,
    setError,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  useEffect(() => {
    setLoading(true);
    getItemEvaluation(item, token)
      .then(data => {
        setData(data);
        setTotal(data.accumulative);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [token, item, setTotal]);

  const onSubmit = values => {
    const body = cleanJSON(values);
    setLoading(true);
    evalFunc(token, body)
      .then(data => {
        setData(data);
        setTotal(data.accumulative);
      })
      .catch(e => {
        Object.keys(e).forEach(key => {
          setError(key, { message: e.data[key] });
        });
      })
      .finally(() => setLoading(false));
  };

  const handlePrev = () => history.push(prevRoute);

  // const handleNext = () => {
  //   if (isEmptyObject(errors)) {
  //     history.push(nextRoute);
  //   }
  // };

  return (
    <section className={`item-template ${wrapperClassName}`}>
      <div className={`blocking-loading ${loading ? 'visible' : ''} main-title`}>
        <h1 className='main-title'>CARGANDO. . .</h1>
      </div>
      <h1 className='main-title'>{`${title} ${data.total ? `\n[${data.total}]` : ''}`}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {render ? render({ register, control, errors, data }) : children}
        {hasPrev && (
          <button className='cta' onClick={handlePrev}>
            Anterior
          </button>
        )}
        {hasNext && (
          <button
            className='cta'
            // onClick={handleNext}
            type={!isEmptyObject(data) ? 'button' : 'submit'}
          >
            Guardar
          </button>
        )}
      </form>
    </section>
  );
};

ItemTemplate.propTypes = {
  item: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  title: PropTypes.string,
  render: PropTypes.func,
  hasNext: PropTypes.bool,
  hasPrev: PropTypes.bool,
};

export default ItemTemplate;
