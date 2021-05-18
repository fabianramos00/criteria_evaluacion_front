import { StepControls } from '../../steps/Steps';
import { legalAspectsRoute, visibilityRoute } from '../../../const/routes';
import { useParams } from 'react-router-dom';
import RadioGroup, { InputOption } from '../../general/radioGroup/RadioGroup';

const Policies = () => {
  const { token } = useParams();

  return (
    <>
      {categories.slice(0, 4).map(cat => (
        <InputOption key={`cat-${cat.id}`} question={cat} placeholder='URL' />
      ))}
      {categories.slice(5, categories.length).map(cat => (
        <RadioGroup key={`cat-${cat.id}`} text={cat.label} options={cat.options} />
      ))}
      <StepControls backRoute={visibilityRoute(token)} nextRoute={legalAspectsRoute(token)} />
    </>
  );
};

const categories = [
  {
    id: 1,
    label: 'Existencia de una política institucional de acceso abierto',
    options: [
      { id: 1, label: 'Sí', value: 3 },
      { id: 2, label: 'Sí, pero...', value: 1.5 },
      { id: 3, label: 'No', value: 0 },
    ],
  },
  {
    id: 2,
    label: 'Existencia de una política de actuación del RI (documento público unificado)',
    options: [
      { id: 1, label: 'Sí', value: 3 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 3,
    label: 'Existencia de información de la política de forma dispersa en el sitio del RI',
    options: [
      { id: 1, label: 'Sí', value: 1.5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 4,
    label: 'Indicación de misión y objetivos del RI',
    options: [
      { id: 1, label: 'Sí', value: 1.5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 5,
    label: 'Indicación de quién puede depositar, qué se puede depositar y en qué formatos',
    options: [
      { id: 1, label: 'Sí', value: 1.5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 6,
    label: 'Indicación de cómo lleva adelante la preservación de los contenidos',
    options: [
      { id: 1, label: 'Sí', value: 1.5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 7,
    label: 'Indicación acerca de la reutilización de los metadatos',
    options: [
      { id: 1, label: 'Sí', value: 1.5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 8,
    label: 'Existencia de datos de contacto y/o asesoramiento visible',
    options: [
      { id: 1, label: 'Sí', value: 1.5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
];

export default Policies;
