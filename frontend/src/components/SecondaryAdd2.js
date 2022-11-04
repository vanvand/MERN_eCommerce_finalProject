import Card from "react-bootstrap/Card";
import {
  
  Col,
 
  Row,
 
} from "react-bootstrap";

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
    <Card className="mb-3" md={4}>
      <Row className="g-0">
        <Col md={4}>
          <Card.Img className="img-thumbnail" src="../../../uploads/books.jpg"  />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title className="text-center align-middle">MOVIES</Card.Title>
            <Card.Text className="text-center align-middle">
              A movie is always a good way to spend an evening together.
              Enjoy our users' large movie collection! 
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default SecondaryAdd2;