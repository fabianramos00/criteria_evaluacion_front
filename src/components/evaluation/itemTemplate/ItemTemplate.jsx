import { useEffect, useState, useContext, forwardRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getItemEvaluation } from '../../../services/evaluation.services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cleanJSON, isEmptyObject } from '../../../utils/common';
import { TotalContext } from '../../../context/context';
import * as Yup from 'yup';
import { summaryRoute } from '../../../const/routes';
import './ItemTemplate.scss';

const ItemTemplate = forwardRef(
  (
    {
      children,
      item = '',
      wrapperClassName = '',
      title = '',
      render,
      hasNext = true,
      hasPrev = true,
      nextRoute = '',
      prevRoute = '',
      form = { defaultValues: {}, schema: Yup.object().shape({}) },
      evalFunc = () => {},
      lastItem = false,
    },
    ref,
  ) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const { setTotal, total, setRepositoryName } = useContext(TotalContext);
    const { token } = useParams();
    const history = useHistory();

    const { defaultValues, schema } = form;

    const {
      handleSubmit,
      register,
      control,
      setError,
      formState: { errors },
      setValue,
    } = useForm({ defaultValues, resolver: yupResolver(schema) });

    useEffect(() => {
      setLoading(true);
      getItemEvaluation(item, token)
        .then(data => {
          setData(data);
          Object.keys(data).forEach(key => {
            if (key !== 'accumulative' && key !== 'total' && key !== 'repository_name') {
              const value = typeof data[key] === 'object' ? data[key].value : data[key];
              setValue(key, value === 1);
            }
          });
          setTotal(data.accumulative);
          setRepositoryName(data.repository_name);
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, [token, item, setTotal, setValue, setRepositoryName]);

    const onSubmit = values => {
      const body = cleanJSON(values);
      if (isEmptyObject(errors)) {
        setLoading(true);
        evalFunc(token, body)
          .then(data => {
            setData(data);
            setTotal(data.accumulative);
          })
          .catch(e => {
            console.log(e);
            Object.keys(e).forEach(key => {
              setError(key, { message: e?.[key] });
            });
          })
          .finally(() => setLoading(false));
      }
    };

    const handlePrev = () => history.push(prevRoute);

    const handleNext = () => {
      if (isEmptyObject(errors)) {
        history.push(nextRoute);
      }
    };

    return (
      <section className={`item-template ${wrapperClassName}`} ref={ref}>
        <div className={`blocking-loading ${loading ? 'visible' : ''} main-title`}>
          <h1 className='main-title'>CARGANDO. . .</h1>
        </div>
        <header>
          <h1 className='main-title'>{`${title} ${
            typeof data.total !== 'undefined' ? `\n[${data.total}]` : ''
          }`}</h1>
          <span className='score'>
            <span>Total</span>
            <br />
            {total}
          </span>
        </header>
        {!loading && (
          <form onSubmit={handleSubmit(onSubmit)}>
            {render
              ? render({ register, control, errors, data, disabled: !isEmptyObject(data) })
              : children}
            {hasPrev && (
              <button className='cta' onClick={handlePrev}>
                Anterior
              </button>
            )}
            {isEmptyObject(data) && (
              <button className='cta' type='submit'>
                Guardar
              </button>
            )}
            {hasNext && !isEmptyObject(data) && (
              <button className='cta' onClick={handleNext} type='button'>
                Siguiente
              </button>
            )}
            {lastItem && data && (
              <a
                href={summaryRoute(token)}
                className='cta summary'
                target='_blank'
                rel='noreferrer'
              >
                Resumen
              </a>
            )}
          </form>
        )}
      </section>
    );
  },
);

ItemTemplate.propTypes = {
  item: PropTypes.string.isRequired,
  wrapperClassName: PropTypes.string,
  title: PropTypes.string,
  render: PropTypes.func,
  hasNext: PropTypes.bool,
  hasPrev: PropTypes.bool,
  lastItem: PropTypes.bool,
};

export default ItemTemplate;
