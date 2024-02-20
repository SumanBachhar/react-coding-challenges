import { useState } from "react";

export const FormWithoutYup = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });
  const [errors, setErrors] = useState();

  const validateForm = () => {};

  const submitHandler = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      console.log("Form Submitted Successfuly", formData);
    } else {
      console.log("Form Validation failed");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }

    setFormData({
      ...formData,
      interests: updatedInterests,
    });
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <h2>This form will be without yup</h2>
        <div className="form">
          <div>
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              placeholder="firstname"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              placeholder="lastname"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="number"
              placeholder="phoneNumber"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="confirmPassword"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              placeholder="age"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              id="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              {/* <option value="">Select Gender</option> */}
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="interests">Interests:</label>
            <label htmlFor="">
              <input
                type="checkbox"
                id="coding"
                name="coding"
                checked={formData.interests.includes("coding")}
                onChange={handleCheckboxChange}
              />
              Coding
            </label>
            <label>
              <input
                type="checkbox"
                name="sports"
                checked={formData.interests.includes("sports")}
                onChange={handleCheckboxChange}
              />
              Sports
            </label>
            <label>
              <input
                type="checkbox"
                name="reading"
                checked={formData.interests.includes("reading")}
                onChange={handleCheckboxChange}
              />
              Reading
            </label>
          </div>
          <div>
            <label htmlFor="Dateofbirth">Date of Birth:</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              placeholder="Enter your date of birth"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};
