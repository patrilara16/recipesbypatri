import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Form, Button } from 'react-bootstrap'

function NavBar() {
  const [text, setText] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === '') return
    navigate(`/?q=${encodeURIComponent(text.trim())}`)
  }

  return (
    <Navbar expand="md" className="border-bottom border-dark border-2">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-1">
          Recipes by Patri 🍳
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavBar