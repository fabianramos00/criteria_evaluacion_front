import { useState } from 'react';
import { Tooltip } from 'react-tooltip';
import './ListItemCheck.scss';
import DetailsModal from '../detailsModal/DetailsModal';

const ListItemCheck = ({ text = '', showResult = false, pass = false }) => {
  const [openDetails, setOpenDetails] = useState(false);

  const isChecked = typeof pass === 'object' ? pass.value : pass;
  const details = typeof pass === 'object' ? pass.details : [];

  const handleDetails = () => setOpenDetails(!openDetails);

  return (
    <li className={`list-item-check ${showResult ? 'evaluated' : ''}`}>
      {showResult && (
        <span className='wrapper'>
          {isChecked ? (
            <>
              <span
                className='material-icons-outlined pass'
                data-tooltip-id='check-pass-tooltip'
                data-tooltip-content='Criterio/atributo encontrado en todos los documentos evaluados'
              >
                check_circle_outline
              </span>
              <Tooltip id='check-pass-tooltip' style={{ backgroundColor: '#636161', color: '#e3e3e3' }} />
            </>
          ) : (
            <>
              <span
                className='material-icons-outlined fails'
                data-tooltip-id='check-fail-tooltip'
                data-tooltip-content='Criterio/atributo no encontrado en todos los documentos evaluados'
              >
                close
              </span>
              <Tooltip id='check-fail-tooltip' style={{ backgroundColor: '#636161', color: '#e3e3e3' }} />
            </>
          )}
        </span>
      )}{' '}
      {details && details.length > 0 ? (
        <span className='details-link' onClick={handleDetails}>
          {text}
        </span>
      ) : (
        text
      )}
      <DetailsModal open={openDetails} onClose={handleDetails} text={text} links={details} />
    </li>
  );
};

export default ListItemCheck;
