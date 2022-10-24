import { Carousel, Image } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from './Loader'
import Message from './Message'

const SliderMultipleImage = () => {


  const imagesSlider = useSelector((state) => state.imagesSlider)
  const { loading, error, products } = imagesSlider

  return (
  loading ? (<Loader />) 
    : error ? (<Message variant='danger'>{error}</Message>) 
    : (
    
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product.image}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
    
  )
  )
}

export default SliderMultipleImage