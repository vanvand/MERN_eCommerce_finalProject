import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Image} from "react-bootstrap";
import { listFaqs } from "../actions/faqActions";

import Loader from "../components/Loader";
import Message from "../components/Message";
import BannerAds from '../components/BannerAds';
import Faq from "../components/Faq";
import Paginate from "../components/Paginate";
import FaqAskButton from "../components/FaqAskButton";
import FaqSearchBox from '../components/FaqSearchBox'

const FaqScreen = () => {
 const params = useParams();
 const keyword = params.keyword;
 const pageNumber = params.pageNumber || 1;

 const dispatch = useDispatch();

 const faqList = useSelector((state) => state.faqList);
  const { loading, error, faqs, page, pages } = faqList;
  
   const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
 useEffect(() => {
   // keyword from search functionality
   dispatch(listFaqs(keyword, pageNumber));
 }, [dispatch, keyword, pageNumber]);
    

  return (
    <>
      
      <h1>FAQ/Help</h1>

      <div style={{width: "50vw"}}>
        <FaqSearchBox />
      </div>

      {userInfo?.isAdmin && (
        <Link to="/faqList" className="btn btn-light">
          Faq list
        </Link>
      )}

      <FaqAskButton />
      {
        // if loading true display Loading message in HomeScreen component
        loading ? (
          <Loader />
        ) : // if error true display error message in HomeScreen component
        error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          // if loading false and no error show faq
          <>
            <Row style={{marginBottom: "3rem"}}>
              {faqs.map((faq) => (
                <Col key={faq._id} sm={12} md={6} lg={4} xl={3}>
                  {/* pass faqs as props to faq component */}
                  <Faq faq={faq} />
                </Col>
              ))}
            </Row>

            <BannerAds />

            <Paginate
              /*  pass props in from state */
              pages={pages}
              page={page}
              faqs={faqs}
              keyword={keyword ? keyword : ""}
            />
          </>
        )
      }
    </>
  );
};

export default FaqScreen;
