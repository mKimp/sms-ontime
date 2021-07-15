import React, { Fragment, useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
function Edit({ contact }) {
  //console.log(contact.phone_id);

  const [show, setShow] = useState({
    display: false,
    modalId: contact.phone_id,
    contactNumber: contact.contact_number,
    contactName: contact.contact_name,
  });

  const [phone, setPhone] = useState(show.contactNumber);

  const handleClose = () => {
    setShow({
      ...show,
      display: false,
    });

    setPhone(show.contactNumber);
  };
  const handleShow = () => {
    setShow({
      ...show,
      display: true,
    });
  };

  const saveChange = async (e, id) => {
    e.preventDefault();
    try {
      const myHeaders = new Headers();

      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("token", localStorage.token);
      const body = {
        contact_name: show.contactName,
        contact_number: phone,
      };

      const res = await fetch(`http://localhost:5000/admin/contacts/${id}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      });
      const parasedRes = await res.json();
      handleClose();
    } catch (error) {
      console.error(error);
    }
    window.location = "/";
  };

  const handleOnChange = (e) => {
    e.preventDefault();
    try {
      setPhone(e.target.value);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Button variant='warning' onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show.display} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{show.contactName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type='email'
                value={phone}
                onChange={(e) => handleOnChange(e)}
              />
              <Form.Text className='text-muted'>
                We'll never share your phone with anyone else.
              </Form.Text>
            </Form.Group>{" "}
          </Form>{" "}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={(e) => saveChange(e, show.modalId)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Edit;
