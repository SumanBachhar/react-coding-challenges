import { useState } from "react";
import * as Yup from "yup";

export const FormWithYup = () => {
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

  const validationSchema = Yup.object({
    firstname: Yup.string().required("First Name is Required"),
    lastname: Yup.string().required("Last Name is Required"),
    email: Yup.string()
      .required("Email is Required")
      .email("Invalid email format"),
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Phone Number must be 10 digits")
      .required("Phone number is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(12, "Password must be maximum 12 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one symbol"
      )
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot be older than 100 years")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),
    interests: Yup.array()
      .min(1, "Select at least one interest")
      .required("Select at least one interest"),
    birthDate: Yup.date()
      .nullable()
      .min(new Date(1900, 0, 1))
      .required("Date of birth is required"),
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    const nonParsed = {
      firstname: "Suman",
      lastname: "Bachhar",
      email: "sumanh@example.com",
      phoneNumber: "1231234218",
      password: "123456Qq*",
      confirmPassword: "123456Qq*",
      age: "18",
      gender: "male",
      interests: ["coding"],
      birthDate: "2024-02-12",
    };

    const parsedUser = validationSchema.cast(nonParsed);

    console.log(nonParsed, parsedUser);

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
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
