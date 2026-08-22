import { useEffect, useState, useContext, forwardRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemEvaluation } from '../../../services/evaluation.services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cleanJSON, isEmptyObject } from '../../../utils/common';
import { TotalContext } from '../../../context/context';
import * as Yup from 'yup';
import { getRouteBySection, HOME_ROUTE, summaryRoute } from '../../../const/routes';
import './ItemTemplate.scss';
import Loading from '../../general/loading/Loading';

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
      evalFunc = () => {
      },
      lastItem = false,
    },
    ref,
  ) => {
    const [loading, setLoading] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [data, setData] = useState({});
    const { setTotal, total, setRepositoryName } = useContext(TotalContext);
    const { token } = useParams();
    const navigate = useNavigate();

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
          setIsCompleted(true);
        })
        .catch((e) => {
          if (e.detail === 'Invalid token') {
            navigate(HOME_ROUTE);
          } else if (!e.is_next) {
            navigate(getRouteBySection[e.next_item](token));
          }
        })
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
            setIsCompleted(true);
          })
          .catch(e => {
            Object.keys(e).forEach(key => {
              setError(key, { message: e?.[key].join(', ') });
            });
          })
          .finally(() => setLoading(false));
      }
    };

    const handlePrev = () => navigate(prevRoute);

    const handleNext = () => {
      if (isEmptyObject(errors)) {
        navigate(nextRoute);
      }
    };

    return (
      <section className={`item-template ${wrapperClassName}`} ref={ref}>
        <Loading loading={loading} />
        <header>
          <div className='title-group'>
            <h1 className='main-title'>{title}</h1>
            {isCompleted && (
              <div className='section-score-pill'>
                <span className='dot'></span>
                Puntaje de Sección: {typeof data.total !== 'undefined' ? data.total : '0'}
              </div>
            )}

          </div>
          {isCompleted && (
            <div className='score-badge'>
              <div className='score-circle'>
                <span className='score-label'>TOTAL</span>
                <span className='score-value'>{total}</span>
              </div>
            </div>
          )}
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          {render
            ? render({ register, control, errors, data, disabled: !isEmptyObject(data) })
            : children}
          <div className='form-actions'>
            {hasPrev && (
              <button className='cta' onClick={handlePrev} type='button'>
                Anterior
              </button>
            )}
            {isEmptyObject(data) && (
              <button className='cta' type='submit'>
                Guardar
              </button>
            )}
            {hasNext && !isEmptyObject(data) && (
              <button className='cta next' onClick={handleNext} type='button'>
                Siguiente
              </button>
            )}
            {lastItem && data && (
              <button
                onClick={() => navigate(summaryRoute(token))}
                className='cta summary'
                type='button'
              >
                Resumen
              </button>
            )}
          </div>

        </form>
      </section>
    );
  },
);

export default ItemTemplate;
