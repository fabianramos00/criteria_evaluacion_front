import { useEffect, useState, useContext, forwardRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getItemEvaluation } from '../../../services/evaluation.services';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { cleanJSON, isEmptyObject } from '../../../utils/common';
import { TotalContext } from '../../../context/context';
import * as Yup from 'yup';
import { summaryRoute } from '../../../const/routes';
import './ItemTemplate.scss';
import { HashLoader } from 'react-spinners';

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
        })
        .catch(() => {
        })
        .finally(() => setLoading(false));
    }, [token, item, setTotal, setValue, setRepositoryName]);

    const onSubmit = values => {
      const body = cleanJSON(values);
      console.log('Form Submission Body:', body);
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
        <div className={`blocking-loading ${loading ? 'visible' : ''}`}>
          <HashLoader color='var(--assessment-400)' loading={loading} size={150} />
          <h1>Cargando</h1>
        </div>
        <header>
          <div className='title-group'>
            <h1 className='main-title'>{title}</h1>
            <div className='section-score-pill'>
              <span className='dot'></span>
              Puntaje de Sección: {typeof data.total !== 'undefined' ? data.total : '0'}
            </div>

          </div>
          <div className='score-badge'>
            <div className='score-circle'>
              <span className='score-label'>TOTAL</span>
              <span className='score-value'>{total}</span>
            </div>
          </div>
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
              <a
                href={summaryRoute(token)}
                className='cta summary'
                target='_blank'
                rel='noreferrer'
              >
                Resumen
              </a>
            )}
          </div>

        </form>
      </section>
    );
  },
);

export default ItemTemplate;
