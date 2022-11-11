import React from 'react'
import { Col, Row, Card, Image } from 'react-bootstrap';

const BannerAds = () => {
  return (
    <>
    <Row>
        <Col>
          <Card className="mb-3" md={4} border="light">
            <Image src="../../../uploads/banner-help-planet.png" />
          </Card>
        </Col>
        <Col>
          <Card className="mb-3" md={4}>
            <Image src="../../../uploads/banner-community.png" />
          </Card>
        </Col>
    </Row>
    </>
  )
}

export default BannerAds