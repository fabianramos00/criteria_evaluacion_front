const Policies = () => {
  return (
    <>
      {categories.map(cat => (
        <div key={`cat-${cat.id}`} role='radiogroup' aria-labelledby='group_label_1' id={cat.id}>
          <h5 id='group_label_1'>{cat.label}</h5>
          <div style={{ display: 'flex' }}>
            {cat.options.map(option => (
              <label
                key={`opt-${cat.id}-${option.id}`}
                className='radio'
                style={{ textAlign: 'center', margin: '0 10px', cursor: 'pointer' }}
              >
                {option.label}
                <input
                  type='radio'
                  name='answer'
                  value={option.value}
                  style={{ cursor: 'pointer' }}
                />
              </label>
            ))}
          </div>
        </div>
      ))}
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
