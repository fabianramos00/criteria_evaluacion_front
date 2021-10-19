import Option from '../../general/option/Option';
import Input from '../../general/input/Input';
import { URL_PLACEHOLDER } from '../../../const/common';
import './ValueServices.scss';
import RadioWithUrl from '../../general/radioWithUrl/RadioWithUrl';

const ValueServices = () => {
  return (
    <section className='value-services'>
      <h1 className='main-title'>Servicios de valor añadido</h1>
      <div className='two-col-content'>
        <Option label='Uso de redes sociales para compartir cada documento' step={1} automatic />
        <Option
          label='Integración con gestores bibliográficos'
          step={2}
          automatic
          text='Zotero, Mendeley, entre otras'
        />
        <Option
          label='Visualización/exportación de los metadatos en diferentes esquemas'
          step={3}
          text='METS, PREMIS, RDF, JSON, MARC, BibTeX, entre otros'
          automatic
        />
        <Option label='Disponibilidad de servicios de alerta (RSS)' step={4} automatic />
        <Option label='Existencia de perfiles de autor' step={5}>
          <Input className='input' placeholder={URL_PLACEHOLDER} />
        </Option>
        <Option label='El repositorio ofrece métricas basadas en citas' step={6}>
          <RadioWithUrl urlLabel='Enalce a las métricas' />
        </Option>
        <Option label='Métricas de nueva generación (como el índice H)' step={7}>
          <RadioWithUrl urlLabel='Enlace a las métricas' />
        </Option>
      </div>
    </section>
  );
};

export default ValueServices;
