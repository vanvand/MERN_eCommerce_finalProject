import React from "react";
import { Button, Card } from "semantic-ui-react";

const FaqAnswer = (answer) => {
  console.log(answer);
  return (
    <Card.Group>
      
      <Card key={answer._id}>
        
          <Card.Content>
            <Card.Header>{answer.name}</Card.Header>
            <Card.Description>{answer.comment}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green">
                Approve
              </Button>
              <Button basic color="red">
                Decline
              </Button>
            </div>
          </Card.Content>
      
      </Card>
  
    </Card.Group>
  );
};

export default FaqAnswer;
