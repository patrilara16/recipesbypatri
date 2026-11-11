import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Form, Button } from 'react-bootstrap'
import { PiHouseFill, PiMagnifyingGlassBold, PiHeartFill } from "react-icons/pi";


function NavBar() {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === '') return
    navigate(`/?q=${encodeURIComponent(text.trim())}`)
  }

  return (
    <Navbar expand="md" className="navbar-line">
      <Container>
        <Navbar.Brand className="fw-bold fs-1">
          Recipes by Patri 🍳
        </Navbar.Brand>
        <Form className="d-flex gap-2" onSubmit={handleSubmit} role="search">
          <Form.Control
            className='search-input rounded-pill'
            type="search"
            placeholder="Search recipes..."
            aria-label="Search recipes"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button type="submit" className="btn-search rounded-circle" aria-label="Search">
            <PiMagnifyingGlassBold />
          </Button>
        </Form>
        <div className="d-flex gap-2">
        <Button as={Link} to="/favorites" className="btn-nav rounded-circle" aria-label="Favorites">
            <PiHeartFill />
        </Button>
        <Button as={Link} to="/" className="btn-nav rounded-circle" aria-label="Home">
            <PiHouseFill />
        </Button>
        </div>
      </Container>
    </Navbar>
  )
}

export default NavBar