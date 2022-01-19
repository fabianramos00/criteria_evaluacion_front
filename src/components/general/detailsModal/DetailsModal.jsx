import Modal from 'react-modal';
import PropTypes from 'prop-types';


Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '50px',
  },
};

const elm = document.createElement('input');
elm.setAttribute('type', 'url');

function isValidURL(u){
  elm.value = u;
  return elm.validity.valid;
}

const DetailsModal = ({ open, onClose, text, links = [] }) => {
  return (
    <Modal isOpen={open} onRequestClose={onClose} style={customStyles} contentLabel='Example Modal'>
      <h2>{text}</h2>
      <ul>
        {links.map((link, index) => (
          <li key={`link-${index}`}>
            {typeof link === 'string' ? (
              isValidURL(link) ? (
                <a href={link} target='_blank' rel='noreferrer' className='detail-link'>
                  {link}
                </a>
              ) : (
                <p>{link}</p>
              )
            ) : Array.isArray(link) ? (
              <a href={link[1]} target='_blank' rel='noreferrer' className='detail-link'>
                {link[1]}
              </a>
            ) : (
              <p>{link.found_in} - {link.name}</p>
            )}
          </li>
        ))}
      </ul>
      <span onClick={onClose} className='material-icons-outlined details-close-icon'>
        close
      </span>
    </Modal>
  );
};

DetailsModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  text: PropTypes.string,
  links: PropTypes.arrayOf(PropTypes.string),
};

export default DetailsModal;