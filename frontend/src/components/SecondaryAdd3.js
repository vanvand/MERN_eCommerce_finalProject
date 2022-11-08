import Card from "react-bootstrap/Card";
import {
  
  Col,
 
  Row,
 
} from "react-bootstrap";
import { Link } from "react-router-dom";

function SecondaryAdd() {
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
    <Card className="mb-3" md={4}><Link
    to={`/products/category/books`}>
  
      <Row className="g-0">
        <Col md={4}>
          <Card.Img className="img-thumbnail" src="../../../uploads/games.jpeg"  />
        </Col>
        <Col md={8}>
          <Card.Body>
          <Card.Title className="text-center align-middle">GAMES</Card.Title>
            <Card.Text className="text-center align-middle">
            Playing board games increases brain function.
            Playing stimulates brain areas that are responsible for memory formation and complex thought processes for all ages. Check the games our users have for rent now! 
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
      </Link>
    </Card>
  );
}

export default SecondaryAdd;