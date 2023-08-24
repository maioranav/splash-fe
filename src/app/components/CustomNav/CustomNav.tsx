"use client";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Image from "next/image";
import "./CustomNav.scss";

export default function CustomNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" id="navbar-back">
        <path
          fill="#0542d5"
          fillOpacity="1"
          d="M0,96L34.3,112C68.6,128,137,160,206,176C274.3,192,343,192,411,170.7C480,149,549,107,617,101.3C685.7,96,754,128,823,128C891.4,128,960,96,1029,74.7C1097.1,53,1166,43,1234,69.3C1302.9,96,1371,160,1406,192L1440,224L1440,0L1405.7,0C1371.4,0,1303,0,1234,0C1165.7,0,1097,0,1029,0C960,0,891,0,823,0C754.3,0,686,0,617,0C548.6,0,480,0,411,0C342.9,0,274,0,206,0C137.1,0,69,0,34,0L0,0Z"
        ></path>
      </svg>
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
