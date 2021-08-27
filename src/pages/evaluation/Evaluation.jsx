import './Evaluation.scss';
import Steps from '../../components/steps/Steps';
import AutomaticMessage from '../../components/automaticMessage/Automatic';
import Visibility from '../../components/evaluation/visibility/Visibility';
import Policies from '../../components/evaluation/policies/Policies';
import LegalAspects from '../../components/evaluation/legalAspects/LegalAspects';
import Safety from '../../components/evaluation/safety/Safety';
import Statistics from '../../components/evaluation/statistics/Statistics';
import Metadata from '../../components/evaluation/metadata/Metadata';
import {
  visibilityRoute,
  policiesRoute,
  legalAspectsRoute,
  metadataRoute,
  interoperabilityRoute,
  securityRoute,
  statsRoute,
  servicesRoute,
} from '../../const/routes';
import { useState } from 'react';
import { TotalContext } from '../../context/context';

function Evaluation() {
  const [total, setTotal] = useState(0);
  const [ratingSmall, setRatingSmall] = useState(false);

  const criteriaSteps = [
    { id: 1, label: 'Visibilidad', component: <Visibility />, path: visibilityRoute },
    { id: 2, label: 'Políticas', component: <Policies />, path: policiesRoute },
    {
      id: 3,
      label: 'Aspectos Legales',
      component: <LegalAspects />,
      path: legalAspectsRoute,
    },
    { id: 4, label: 'Metadatos', component: <Metadata />, path: metadataRoute },
    {
      id: 5,
      label: 'Interoperabilidad',
      component: <AutomaticMessage />,
      path: interoperabilityRoute,
    },
    { id: 6, label: 'Seguridad', component: <Safety />, path: securityRoute },
    { id: 7, label: 'Estadísticas', component: <Statistics />, path: statsRoute },
    {
      id: 8,
      label: 'Servicios de valor añadido',
      component: <AutomaticMessage />,
      path: servicesRoute,
    },
  ];

  const handleRatingSmall = () => setRatingSmall(!ratingSmall);

  return (
    <div className='evaluation'>
      <div className='header'>
        <h2 className='evaluation__title'>Evaluación del repositorio</h2>
        <div className={`rating ${ratingSmall && 'small'}`} onClick={handleRatingSmall}>
          <p>Puntuación total</p>
          {total}
        </div>
      </div>
      <TotalContext.Provider value={{ setTotal }}>
        <Steps items={criteriaSteps} />
      </TotalContext.Provider>
    </div>
  );
}

export default Evaluation;
