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

  const isValidEmail = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    // Regular expression for basic phone number validation (10 digits)
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isValidPassword = (password) => {
    // Regular expressions for password validation
    const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;
    const upperCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    return (
      password.length >= 8 &&
      symbolRegex.test(password) &&
      numberRegex.test(password) &&
      upperCaseRegex.test(password) &&
      lowerCaseRegex.test(password)
    );
  };

  const isValidAge = (age) => {
    return parseInt(age) >= 18 && parseInt(age) <= 100;
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstname) {
      newErrors.firstname = "First name is required";
    }
    if (!formData.lastname) {
      newErrors.lastname = "Last name is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!isValidPhoneNumber(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters long and contain at least one symbol, one number, one uppercase letter, and one lowercase letter";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords must match";
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (!isValidAge(formData.age)) {
      newErrors.age =
        "You must be at least 18 years old and not older than 100 years";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (formData.interests.length === 0) {
      newErrors.interests = "Select at least one interest";
    }
    if (!formData.birthDate) {
      newErrors.birthDate = "Date of birth is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  console.log(errors);

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
            {errors && errors.firstname && (
              <div className="error">{errors.firstname}</div>
            )}
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
            {errors && errors.lastname && (
              <div className="error">{errors.lastname}</div>
            )}
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
            {errors && errors.email && (
              <div className="error">{errors.email}</div>
            )}
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
            {errors && errors.phoneNumber && (
              <div className="error">{errors.phoneNumber}</div>
            )}
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
            {errors && errors.password && (
              <div className="error">{errors.password}</div>
            )}
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
            {errors && errors.confirmPassword && (
              <div className="error">{errors.confirmPassword}</div>
            )}
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
            {errors && errors.age && <div className="error">{errors.age}</div>}
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
            {errors && errors.gender && (
              <div className="error">{errors.gender}</div>
            )}
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
            {errors && errors.interests && (
              <div className="error">{errors.interests}</div>
            )}
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
            {errors && errors.birthDate && (
              <div className="error">{errors.birthDate}</div>
            )}
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  );
};
