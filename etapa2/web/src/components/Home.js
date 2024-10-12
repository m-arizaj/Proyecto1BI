import { Container, Row, Col, Button, Card, Navbar, Nav } from 'react-bootstrap'
import Logo from '../assets/images/UNFPA_logo.png'

const Home = () => {
  return (
    <>
      {/* Header */}
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand href='#home'>
            <img src={Logo} alt='UNFPA Logo' width='40' />
            <span className='ms-3'>Análisis de Opiniones y ODS</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              <Nav.Link href='#opiniones'>Analizar Opiniones</Nav.Link>
              <Nav.Link href='#modelo'>Reentrenar Modelo</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container fluid className='text-center bg-light py-5'>
        <h1 className='display-4'>
          Relacionando Opiniones Ciudadanas con los ODS
        </h1>
        <p className='lead'>
          Automatiza el análisis de opiniones para los Objetivos de Desarrollo
          Sostenible.
        </p>
        <div className='mt-4'>
          <Button
            variant='primary'
            size='lg'
            href='#opiniones'
            className='me-3'
          >
            Analizar Opiniones
          </Button>
          <Button variant='outline-primary' size='lg' href='#modelo'>
            Reentrenar Modelo
          </Button>
        </div>
      </Container>

      {/* Functionalities Section */}
      <Container className='py-5'>
        <Row>
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body className='text-center'>
                <Card.Title>Analizar Opiniones</Card.Title>
                <Card.Text>
                  Envía opiniones y descubre cómo se relacionan con los ODS 3, 4
                  y 5.
                </Card.Text>
                <Button variant='primary' href='#opiniones'>
                  Acceder
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className='mb-4'>
            <Card>
              <Card.Body className='text-center'>
                <Card.Title>Reentrenar el Modelo</Card.Title>
                <Card.Text>
                  Sube nuevos datos y mejora el modelo de análisis
                  automáticamente.
                </Card.Text>
                <Button variant='outline-primary' href='#modelo'>
                  Acceder
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className='bg-light text-center py-4'>
        <p className='mb-0'>
          © 2024 UNFPA | <a href='#privacidad'>Política de Privacidad</a>
        </p>
      </footer>
    </>
  )
}

export default Home
