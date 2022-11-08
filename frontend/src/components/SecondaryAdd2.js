import Card from "react-bootstrap/Card";
import {
  
  Col,
  Row,
 
} from "react-bootstrap";
import { Link } from "react-router-dom";

function SecondaryAdd2() {
  return (
    // <Card className="bg-light text-black">
    //   <Card.Img src="../../../uploads/add2.png" alt="Card image" />
    //   <Card.ImgOverlay>
    //     <Card.Title>Card title</Card.Title>
    //     <Card.Text>
    //       This is a wider card with supporting text below as a natural lead-in
    //       to additional content. This content is a little bit longer.
    //     </Card.Text>
    //     <Card.Text>Last updated 3 mins ago</Card.Text>
    //   </Card.ImgOverlay>
    // </Card>
    <Card className="mb-3" md={4}><Link to={`/products/category/movies`}>
      <Row className="g-0 align-middle">
        <Col md={4}>
          <Card.Img className="img-thumbnail" src="../../../uploads/movies.jpeg"  />
        </Col>
        <Col md={8} >
          <Card.Body style={{justifyContent: "center", alignItems: "center", padding: "1rem "}}>
            <Card.Title className="text-center ">
              MOVIES
            </Card.Title>
            <Card.Text className="text-center">
            Movies could provide both enjoyment and stress reduction
              Enjoy our users' large movie collection! 
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
      </Link>
    </Card>
  );
}

export default SecondaryAdd2;