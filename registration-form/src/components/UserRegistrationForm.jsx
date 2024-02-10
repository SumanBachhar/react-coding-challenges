import { useState } from "react";
import * as Yup from "yup"; // Import Yup for input validation

function UserRegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Schema for input validation using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required."),
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required."),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long.")
      .required("Password is required."),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Validate form using Yup
      await validationSchema.validate(formData, { abortEarly: false });
      // Simulate API call with delay
      await mockAPICall(formData);
      setSuccessMessage("Registration successful!");
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      if (error.name === "ValidationError") {
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      } else {
        console.error("Error:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Simulated API call with delay
  const mockAPICall = (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log("Form data submitted:", formData);
        resolve();
      }, 2000); // Simulated delay of 2 seconds
    });
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <button type="submit" disabled={isLoading}>
          Register
        </button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default UserRegistrationForm;
