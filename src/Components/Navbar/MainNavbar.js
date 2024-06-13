import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function MainNavbar() {
    return (
        <>
            <Navbar className='m-0 p-0' bg="light" style={{ backgroundColor: "#fff" }} data-bs-theme="light">
                <Container fluid className='d-flex justify-content-between text-center' >
                    <Navbar.Brand>
                        Income & Expence Management
                    </Navbar.Brand>
                    <Nav className="me-auto text-center">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default MainNavbar;