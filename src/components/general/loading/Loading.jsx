import './Loading.scss';
import { HashLoader } from 'react-spinners';

const Loading = ({ loading, overlay = true, size = 80, text = 'Cargando' }) => {
  if (overlay) {
    return (
      <div className={`blocking-loading ${loading ? 'visible' : ''}`}>
        <HashLoader
          color='#009688'
          loading={loading}
          size={size}
          speedMultiplier={1.25}
          role='status'
          aria-label='Cargando'
        />
        <p className='loading-label'>{text}</p>
      </div>
    );
  }

  return (
    <div className='loading-container'>
      <HashLoader
        color='#009688'
        loading={loading}
        size={size}
        speedMultiplier={1.25}
        role='status'
        aria-label='Cargando'
      />
      <p className='loading-text'>{text}</p>
    </div>
  );
};

export default Loading;
