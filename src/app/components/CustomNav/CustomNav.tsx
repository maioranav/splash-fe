"use client";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Image from "next/image";
import navbarbg from "../../../../public/assets/wave.svg";
import "./CustomNav.scss";

export default function CustomNav() {
  return (
    <>
      {true && (
        <div className="bg-body-tertiary">
          <img src={navbarbg.src} alt="" style={{ position: "absolute", opacity: 0.3 }} />
          <Navbar id="custNavStyle" expand="lg" className="container custom-navbar">
            <Container fluid>
              <Navbar.Brand href="/">
                <Image src="/imgs/logo_splash_tr.png" alt="Radio Splash Logo" width={110} height={53} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="navbarScroll" />
              <Navbar.Collapse id="navbarScroll">
                <Nav className="me-auto my-2 my-lg-0 w-100 justify-content-end" style={{ maxHeight: "100px" }} navbarScroll>
                  <Nav.Link href="#action1">Home</Nav.Link>
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
        </div>
      )}
    </>
  );
}
