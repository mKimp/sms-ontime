import React, { Fragment, useState, useEffect } from "react";
import Edit from "./Edit";
function AllContact({ infos }) {
  console.log(infos);

  const [allContacts, setAllContacts] = useState(infos);

  const deleteContact = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/admin/contacts/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      setAllContacts(allContacts.filter((item) => item.phone_id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setAllContacts(infos);
  }, [infos]);

  return (
    <Fragment>
      <table className='table mt-5'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Scheduled To Text</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {allContacts.length !== 0 &&
            allContacts[0].phone_id !== null &&
            allContacts.map((item) => (
              <tr key={item.phone_id}>
                <td>{item.contact_name}</td>
                <td>{item.contact_number}</td>
                <td> Scheudle here</td>
                <td>
                  <Edit contact={item} />
                </td>
                <td>
                  <button
                    className='btn btn-danger'
                    onClick={() => deleteContact(item.phone_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Fragment>
  );
}

export default AllContact;
