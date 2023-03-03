import React, { useState } from "react";
import Helmet from "../components/Helmet/Helmet";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../styles/login.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db } from "../firebase.config";
import { storage } from "../firebase.config";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";

export const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const storageRef = ref(storage, `images/${Date.now() + userName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        (error) => {
          toast.error(error.massage);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //update user profile
            await updateProfile(user, {
              displayName: userName,
              photoURL: downloadURL,
            });

            //store user data in firestore database
            await setDoc(doc(db, "users", user.uid),{
              uid:user.uid,
              displayName:userName,
              email,
              photoURL:downloadURL
            });
          });
        }
      );
      console.log(user);
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            <Col lg="6" className="m-auto text-center">
              <h3 className="fw-bold mb-4 ">Signup</h3>

              <Form className="auth__form" onSubmit={signup}>
                <FormGroup className="form__group">
                  <input
                    type="text"
                    placeholder="User Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="form__group">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </FormGroup>
                <button type="submit" className="buy_btn auth__btn">
                  Create an Account
                </button>
                <p>
                  Already have an account?
                  <Link to="/login"> Login</Link>
                </p>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
