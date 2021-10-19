import { useParams } from 'react-router-dom';
import Option from '../../general/option/Option';
import RadioGroup from '../../general/radioGroup/RadioGroup';
import { YES_NO_OPTIONS } from '../../../const/common';
import ItemTemplate from '../itemTemplate/ItemTemplate';
import { metadataRoute, securityRoute } from '../../../const/routes';
import './Interoperability.scss';

const Interoperability = () => {
  const { token } = useParams();

  return (
    <>
      <ItemTemplate
        item='interoperability'
        title='Interoperabilidad'
        wrapperClassName='interoperability'
        prevRoute={metadataRoute(token)}
        nextRoute={securityRoute(token)}
      >
        <div className='two-col-content'>
          <Option label='Recolectado por SNRD-LA Referencia-OpenAIRE' step={1} automatic />
          <Option
            label='Se proveen los metadatos a través del protocolo OAI-PMH'
            step={2}
            automatic
          />
        </div>
        <div className='two-col-content'>
          <Option label='Se marcan los registros eliminados' step={3}>
            <RadioGroup options={YES_NO_OPTIONS} />
          </Option>
          <Option
            label='El tiempo de vida del testigo de reanudación es de un mínimo de veinticuatro horas'
            step={4}
          >
            <RadioGroup options={YES_NO_OPTIONS} />
          </Option>
          <Option
            label='El correo electrónico del administrador del repositorio está disponible en la etiqueta AdminEmail dentro de la respuesta a una orden Identify'
            step={5}
          >
            <RadioGroup options={YES_NO_OPTIONS} />
          </Option>
          <Option
            label='Existe una declaración de Description en la respuesta a una orden Identify'
            step={6}
          >
            <RadioGroup options={YES_NO_OPTIONS} />
          </Option>
          <Option
            label='La entrega de registros a través del protocolo OAI-PMH es progresiva a través de lotes'
            step={7}
          >
            <RadioGroup options={YES_NO_OPTIONS} />
          </Option>
          <Option
            label='El tamaño de los lotes para la entrega de registros está dentro del rango de 100-500 registros'
            step={8}
          >
            <RadioGroup options={YES_NO_OPTIONS} />
          </Option>
          <Option
            label='El formato de la fecha expresado en la orden Identify coincide con el campo datestamp de los registros'
            step={9}
          >
            <RadioGroup options={YES_NO_OPTIONS} />
          </Option>
          <Option label='Integración con otros sistemas de información de la institución' step={10}>
            <RadioGroup options={YES_NO_OPTIONS} />
          </Option>
        </div>
        <Option label='Inclusión de etiquetas <meta…> en las cabeceras HTML ' step={11} automatic>
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
          >
            <RadioGroup options={YES_NO_OPTIONS} />
          </Option>
          <Option
            label='Uso extendido de identificadores persistentes'
            text='DOI, Handle, URN, ORCID, entre otras'
            step={13}
            automatic
          />
        </div>
      </ItemTemplate>
    </>
  );
};

export default Interoperability;
