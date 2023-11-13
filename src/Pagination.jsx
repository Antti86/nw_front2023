
import Pagination from 'react-bootstrap/Pagination';

// https://react-bootstrap.netlify.app/docs/components/pagination

//Komponentti hoitaa sivutus rutiinin

const Paginations = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  for (let number = 1; number <= totalPages; number++) {
    pageNumbers.push(
      <Pagination.Item className='Page' key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination>{pageNumbers}</Pagination>
  );
};

export default Paginations;


