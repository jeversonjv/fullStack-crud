import React from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { IoIosAddCircleOutline, IoIosHome } from "react-icons/io";

export default function Header() {
  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          <IoIosHome /> Crud de alunos
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/add/">
              <IoIosAddCircleOutline /> Adicionar
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
