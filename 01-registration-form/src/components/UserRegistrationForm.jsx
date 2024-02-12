import { useState } from "react";

export const UserRegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    address: "",
    number: "",
    email: "",
    password: "",
  });

  const handlleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <h2>User Registration</h2>
        <div>
          <div>
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              placeholder="Name"
              id="username"
              name="username"
              value={formData.username}
              onChange={handlleChange}
            />
          </div>
          <div>
            <label htmlFor="Address">Address</label>
            <input
              type="text"
              placeholder="Address"
              id="address"
              name="address"
              value={formData.address}
              onChange={handlleChange}
            />
          </div>
          <div>
            <label htmlFor="Number">Number</label>
            <input
              type="number"
              placeholder="Number"
              id="number"
              name="number"
              value={formData.number}
              onChange={handlleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handlleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handlleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};
