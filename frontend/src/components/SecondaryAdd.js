import Card from "react-bootstrap/Card";
import {
  
  Col,
 
  Row,
 
} from "react-bootstrap";

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
    <Card className="mb-3" md={4}>
      <Row className="g-0">
        <Col md={4}>
          <Card.Img src="../../../uploads/add1.png" />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>Card title</Card.Title>
            <Card.Text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </Card.Text>
            <Card.Text>
              <small className="text-medium-emphasis">
                Last updated 3 mins ago
              </small>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default SecondaryAdd;
