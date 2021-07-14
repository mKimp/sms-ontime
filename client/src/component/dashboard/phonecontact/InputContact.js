import React, { Fragment, useState } from "react";

function InputContact({ name }) {
  const [description, setDescription] = useState({
    friendName: "",
    friendPhone: "",
  });

  const { friendName, friendPhone } = description;

  const handleOnChange = (e) => {
    setDescription({ ...description, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setDescription("");

      window.location("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className='text-center mt-5'>{name} 's phone contacts</h1>
      <form onSubmit={handleSubmit}>
        <div class='form-group'>
          <label for='friendName'>Name</label>
          <input
            type='text'
            name='friendName'
            id='friendName'
            className='form-control'
            placeholder="Enter your friend's name"
            aria-describedby='helpId'
            value={friendName}
            onChange={handleOnChange}
          />
        </div>

        <div class='form-group'>
          <label for='friendPhone'>Phone Number</label>
          <input
            type='tel'
            name='friendPhone'
            id='friendPhone'
            className='form-control'
            placeholder="Enter your friend's phone"
            aria-describedby='helpId'
            value={friendPhone}
            onChange={handleOnChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Add
        </button>
      </form>
    </div>
  );
}

export default InputContact;
