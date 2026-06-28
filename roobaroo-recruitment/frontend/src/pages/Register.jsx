import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import MultiSelectField from "../components/MultiSelectField";

import {
  branches,
  years,
  verticals,
} from "../data/options";

import "../styles/register.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    fullName: "",

    email: "",

    phone: "",

    branch: "",

    year: "",

    selectedVerticals: [],

    danceTrackLink: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const payload = {

            full_name: formData.fullName,

            branch: formData.branch,

            year_of_study: formData.year,

            email: formData.email,

            phone: formData.phone,

            verticals: formData.selectedVerticals.map(
                item => item.value
            )

        };

        const response = await api.post(
            "/register",
            payload
        );

        localStorage.setItem("ttr_id", response.data.ttr_id);

        navigate("/success", {
          state: {
              ttr_id: response.data.ttr_id
          }
      });

        console.log(response.data);

    }

    catch(error){

        if(error.response){

            alert(error.response.data.message);

        }

        else{

            alert("Server not responding.");

        }

    }

};

  const showDanceField = formData.selectedVerticals.some(
    (item) => item.value === "Dance"
  );

  return (

    <>

      <Navbar />

      <section className="register-page">

        <form
          className="register-card"
          onSubmit={handleSubmit}
        >

          <h1>Candidate Registration</h1>

          <p>
            Join Roobaroo and showcase your talent.
          </p>

          <div className="register-grid">

            <InputField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />

            <InputField
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />

            <SelectField
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              options={branches}
              required
            />

            <SelectField
              label="Year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              options={years}
              required
            />

          </div>

          <MultiSelectField
            label="Select Your Verticals"
            options={verticals}
            value={formData.selectedVerticals}
            onChange={(selected) =>
              setFormData({
                ...formData,
                selectedVerticals: selected || [],
              })
            }
          />

          {showDanceField && (

            <div className="dance-track">

              <InputField
                label="Dance Track Link"
                name="danceTrackLink"
                value={formData.danceTrackLink}
                onChange={handleChange}
                placeholder="Paste Google Drive / YouTube link"
              />

            </div>

          )}

          <button
            className="submit-btn"
            type="submit"
          >
            Register
          </button>

        </form>

      </section>

      <Footer />

    </>

  );

}

export default Register;