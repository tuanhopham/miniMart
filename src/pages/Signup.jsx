import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Container, Form, FormGroup, Row } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { auth, db, storage } from "../firebase.config";
import { Eye, EyeOff } from "lucide-react";
import "../styles/login.css";

export const Signup = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    }
  };

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

      if (!file) {
        setLoading(false);
        toast.error("Please select a valid file.");
        return;
      }

      const storageRef = ref(storage, `images/${Date.now()}_${userName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("Upload is in progress:", snapshot.bytesTransferred, "of", snapshot.totalBytes);
        },
        (error) => {
          console.error("Error during upload:", error);
          toast.error("Upload failed: " + error.message);
          setLoading(false);
        },
        async () => {
          try {

            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Download URL:", downloadURL);

            // Update user profile
            await updateProfile(user, {
              displayName: userName,
              photoURL: downloadURL,
            });
            console.log("User profile updated successfully.");

            // Store user data in Firestore database
            await setDoc(doc(db, "users", email), {
              uid: user.uid,
              displayName: userName,
              email,
              photoURL: downloadURL,
              bills:[],
              cart:{
                cartItems:[],
                totalAmount:0,
                totalQuantily:0
              }
            });
            console.log("User data stored in Firestore successfully.");

            setLoading(false);
            toast.success("Account created successfully.");
            navigate("/login");
          } catch (error) {
            console.error("Error during finalization:", error);
            toast.error("Failed to complete account setup: " + error.message);
            setLoading(false);
          }
        }
      );
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <Helmet title="Signup">
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg="12" className="text-center">
                <h5>Loading.....</h5>
              </Col>
            ) : (
              <Col lg="6" className="m-auto text-center">
                <h3 className="fw-bold mb-4">Signup</h3>

                <Form className="auth__form" onSubmit={signup}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="User Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <div className="password-wrapper relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="icon-btn absolute right-4 top-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                    />
                  </FormGroup>
                  {preview && (
                    <div className="image-preview">
                      <img src={preview} alt="Preview" style={{ maxWidth: "100%", marginBottom: "10px" }} />
                    </div>
                  )}
                  <button type="submit" className="buy_btn auth__btn">
                    Create an Account
                  </button>
                  <p>
                    Already have an account?
                    <Link to="/login"> Login</Link>
                  </p>
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
