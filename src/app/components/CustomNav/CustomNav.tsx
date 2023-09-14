"use client";
import "./CustomNav.scss";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { GoCalendar, GoHome, GoMail, GoPeople, GoReply } from "react-icons/go";
import { BsInstagram, BsFacebook } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import navbarbg from "../../../../public/assets/wave.svg";
import { usePathname } from "next/navigation";

export default function CustomNav() {
  const pathname = usePathname();
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
              <Image src="/imgs/logo_splash_tr.png" alt="Radio Splash Logo" width={103} height={53} />
              <div className="d-none d-md-inline p-2 text-muted social-links">
                <a href="https://fb.me/radiosplash" title="radiosplash su facebook" target="_blank">
                  <BsFacebook />
                </a>
                <a href="https://www.instagram.com/radiosplash/" title="radiosplash su instagram" target="_blank">
                  <BsInstagram />
                </a>
              </div>
            </Navbar.Brand>
            <div className="d-flex d-md-none">
              <Link className={pathname == "/" ? "nav-link mobile-nav-link active-link" : "nav-link mobile-nav-link"} href="/">
                <GoHome />
              </Link>
              <Link className={pathname == "/staff" ? "nav-link mobile-nav-link active-link" : "nav-link mobile-nav-link"} href="/staff">
                <GoPeople />
              </Link>
              <Link className={pathname == "/palinsesto" ? "nav-link mobile-nav-link active-link" : "nav-link mobile-nav-link"} href="/palinsesto">
                <GoCalendar />
              </Link>
              <Link className={pathname == "/replay" ? "nav-link mobile-nav-link active-link" : "nav-link mobile-nav-link"} href="/replay">
                <GoReply />
              </Link>
              <Link className={pathname == "/contatti" ? "nav-link mobile-nav-link active-link" : "nav-link mobile-nav-link"} href="/contatti">
                <GoMail />
              </Link>
            </div>
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0 w-100 justify-content-end" style={{ maxHeight: "100px" }} navbarScroll>
                <Link className={pathname == "/" ? "nav-link active-link" : "nav-link"} href="/">
                  Home
                </Link>
                <Link className={pathname == "/staff" ? "nav-link active-link" : "nav-link"} href="/staff">
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
                <Link className={pathname == "/contatti" ? "nav-link active-link" : "nav-link"} href="/contatti">
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
