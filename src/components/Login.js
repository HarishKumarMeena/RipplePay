import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert, Modal, Button, Spinner } from "react-bootstrap";
import { useUserAuth } from "../context/UserAuthContext";
import FaceLogin from "./FaceLogin";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "bootstrap/dist/js/bootstrap.min.js"; 
import NavLogo from "../images/xrp_logo.svg";



const Login = () => { 
    const [email, setEmail] = useState("");
    const password = "engage@1234";
    const [error, setError] = useState("");
    const { logIn } = useUserAuth();

    //Spinner states
    const [loading, setLoading] = useState(false);    

    //Login form submission
    const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      setError("");
      try {
        await logIn(email, password);
        handleLogout();
        handleShow();
      } catch (err) {
        setError("Email not found!");
        setLoading(false);
      }
    };


    const { logOut } = useUserAuth();
    const navigate = useNavigate();

    //Handel Logout 
    const handleLogout = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    };


    // ----------Modal states----------
    const [show, setShow] = useState(false);
    const [modalCloseButton, setModalCloseButton] = useState(false);

    //Closing face Auth modal
    function handleClose() {
      setShow(false);
      setLoading(false);
    }; 

    //Opening face auth modal
    const handleShow = () => setShow(true);

    //disabling modal close button
    function disableModalCloseButton() {
      setModalCloseButton(true);
    }

    //disabling modal close button
    function enableModalCloseButton() {
      setModalCloseButton(false);
    }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link className="navbar-brand d-flex align-items-center ms-1" to="/">
          <img src={NavLogo} className="rounded nav_logo me-1"/>
          RipplePay
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <Link className="nav-item nav-link me-2" to="/Signup">Signup</Link>
          </div>
        </div>

      </nav>
        
        


      {/* ----------Login Card----------  */}
    
      <section className="vh-100 login_background mb-5">
        <div className="container h-100">
          <div className="row justify-content-center align-items-centre h-100">
            <div className="d-flex justify-content-center align-items-center">
              <div className="bg-transparent text-light border border-0 mb-5">
                <div className="card-body text-center d-flex flex-column float-left p-0">

                  <div>
                    <h3 className="float-center fw-bold fs-3">Log in to RipplePay</h3>
                  </div>
                      
                  {error && <Alert variant="danger">{error}</Alert>}

                  <Form onSubmit={handleSubmit}>
                    <div className="pt-4 pb-4">
                      <div className="d-flex float-left fw-bold">
                        <label className="form-label pt-4">Email address</label>
                      </div>

                      <Form.Group controlId="formBasicEmail">
                        <Form.Control className="border-dark border-1 p-2" type="email" onChange={(e) => setEmail(e.target.value)} />
                      </Form.Group>
                    </div>

                    {/* ----------Modal trigger button---------- */}
                    <div className="d-flex flex-column gap-2"> 
                      <div> 
                        {loading ? <Spinner animation="border" /> : <button className="btn btn-light btn-md btn-block" type="submit"> Login </button>}   
                      </div>
                    </div>

                    {/* Card footer */}
                    <br/>
                    <span className="d-none d-md-block d-lg-block d-xl-block">__________________________________________________</span>
                  </Form>

                  <div className="mt-2">
                    New User? <Link to="/signup">Register here</Link>
                  </div>                            

                </div>
              </div>
            </div>            
          </div>
        </div>
      </section>
      

      {/* ----------Modal---------- */}
      <Modal
        size="lg"
        backdrop="static"
        aria-labelledby="contained-modal-title-vcenter"
        centered show={show} onHide={handleClose}
        dialogClassName="modal-60h">

        <Modal.Header>
          <Modal.Title>
            <p className="text-center">Authentication</p>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FaceLogin email = {email} password = "engage@1234" disableModalCloseButton = {disableModalCloseButton} enableModalCloseButton = {enableModalCloseButton}/>
        </Modal.Body>

        <Modal.Footer>
          {modalCloseButton ? 
            <Button className="btn btn-dark" disabled> Close </Button>
          :
            <Button className="btn btn-dark" onClick={handleClose}> Close </Button>
          }
        </Modal.Footer>
      </Modal>
      {/* ----------Modal---------- */}
    </div>
      );
    };
    
    export default Login;