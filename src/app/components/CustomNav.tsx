"use client";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Image from "next/image";

export default function CustomNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">
          <Image src="/imgs/logo_splash_tr.png" alt="Radio Splash Logo" width={100} height={52} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 w-100 justify-content-end" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2" disabled>
              Radio
            </Nav.Link>
            <Nav.Link href="#action2">TV</Nav.Link>
            <Nav.Link href="#action2" disabled>
              Staff
            </Nav.Link>
            <NavDropdown title="Palinsesto" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Programmazione</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action4">Replay</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Contatti
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
