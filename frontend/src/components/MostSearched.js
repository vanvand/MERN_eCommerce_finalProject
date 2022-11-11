import React, { useEffect } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './components_css/mostSearched.css';
import { listSearch } from '../actions/mostSearchActions';

function MostSearched() {
  const dispatch = useDispatch();

  const searchList = useSelector((state) => {
    return state.searchList;
  });
  const { mostSearch } = searchList;

  useEffect(() => {
    dispatch(listSearch());
  }, [dispatch]);

  return (
    <Container className='most-searched-container'>
      <h3 className='h3-custom'>Most Searched</h3>
      <Row d-flex='true' flex-row='true' className="most-searched-terms">
        {mostSearch?.map((searched, index) => (
          <Col key={index} className='alignStart'>
            <Badge
              bg='secondary'
              text='dark'
              overflow='hidden'
              className='searchText'
            >
              {' '}
              <h5> {searched._id}/</h5>
            </Badge>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MostSearched;
