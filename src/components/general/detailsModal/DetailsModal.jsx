import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '3rem',
    borderRadius: '1rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0,0,0,0.1)',
    maxWidth: '80vw',
    maxHeight: '80vh',
    overflowY: 'auto'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000
  }
};

const elm = document.createElement('input');
elm.setAttribute('type', 'url');

function isValidURL(u){
  elm.value = u;
  return elm.validity.valid;
}

const DetailsModal = ({ open, onClose, text, links = [] }) => {
  return (
    <Modal isOpen={open} onRequestClose={onClose} style={customStyles} contentLabel='Detalles'>
      <h2 style={{marginTop: 0, marginBottom: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--scholarly-900)'}}>{text}</h2>
      <ul style={{paddingLeft: '1.5rem', marginBottom: '2rem'}}>
        {links.map((link, index) => (
          <li key={`link-${index}`} style={{marginBottom: '0.5rem', color: 'var(--ink-700)'}}>
            {typeof link === 'string' ? (
              isValidURL(link) ? (
                <a href={link} target='_blank' rel='noreferrer' className='detail-link' style={{color: 'var(--info)'}}>
                  {link}
                </a>
              ) : (
                <p style={{margin: 0}}>{link}</p>
              )
            ) : Array.isArray(link) ? (
              <a href={link[1]} target='_blank' rel='noreferrer' className='detail-link' style={{color: 'var(--info)'}}>
                {link[1]}
              </a>
            ) : (
              <p style={{margin: 0}}>{link.found_in} - {link.name}</p>
            )}
          </li>
        ))}
      </ul>
      <button 
        onClick={onClose} 
        className='material-icons-outlined details-close-icon'
        style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.5rem',
            color: 'var(--ink-500)'
        }}
      >
        close
      </button>
    </Modal>
  );
};

export default DetailsModal;