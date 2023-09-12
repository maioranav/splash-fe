"use client";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { BsInstagram, BsFacebook } from "react-icons/bs";
import navbarbg from "../../../../public/assets/wave.svg";
import "./CustomNav.scss";

export default function CustomNav() {
  return (
    <>
      <div className="bg-body-tertiary">
        {
          // eslint-disable-next-line @next/next/no-img-element
          <img src={navbarbg.src} alt="" style={{ position: "absolute", opacity: 0.3, zIndex: 0 }} />
        }
        <Navbar id="custNavStyle" expand="md" className="container custom-navbar">
          <Container fluid>
            <Navbar.Brand href="/">
              <Image src="/imgs/logo_splash_tr.png" alt="Radio Splash Logo" width={110} height={53} />
              <div className="d-inline p-2 text-muted social-links">
                <a href="https://fb.me/radiosplash" target="_blank">
                  <BsFacebook />
                </a>
                <a href="https://www.instagram.com/radiosplash/" target="_blank">
                  <BsInstagram />
                </a>
              </div>
            </Navbar.Brand>
            <div className="d-block d-md-none">ICONE MOBILE</div>
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0 w-100 justify-content-end" style={{ maxHeight: "100px" }} navbarScroll>
                <Link className="nav-link" href="/">
                  Home
                </Link>
                <Link className="nav-link" href="/staff">
                  Staff
                </Link>
                <NavDropdown title="Palinsesto" id="navbarScrollingDropdown">
                  <Link className="dropdown-item" href="/palinsesto">
                    Programmazione
                  </Link>
                  <NavDropdown.Divider />
                  <Link className="dropdown-item" href="/replay">
                    Replay
                  </Link>
                </NavDropdown>
                <Link className="nav-link" href="/contatti">
                  Contatti
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}
