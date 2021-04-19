const Safety = () => {
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
    label: 'Mención en el sitio del RI de la realización de copias de seguridad',
    options: [
      { id: 1, label: 'Sí', value: 5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
  {
    id: 2,
    label: 'Mención en el sitio del RI de la ejecución de sumas de verificación (checksum)',
    options: [
      { id: 1, label: 'Sí', value: 5 },
      { id: 2, label: 'No', value: 0 },
    ],
  },
];

export default Safety;
