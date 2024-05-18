import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import './Register.css'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex

const Register = () => {
    const userRef = useRef();
    const emailRef = useRef(); // New reference for email field
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState(''); // New state for email
    const [validEmail, setValidEmail] = useState(false); // New state for email validation
    const [emailFocus, setEmailFocus] = useState(false); // New state for email focus

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email)); // Validate email
    }, [email])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, email, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const newUser = { username: user, email, password: pwd }; // Updated object keys to match backend
    
            axios.post(`http://localhost:8070/logins/register`, newUser) // Updated the route to /register
                .then((response) => {
                    console.log(response?.data);
                    console.log(response?.accessToken);
                    console.log(JSON.stringify(response))
                    setSuccess(true);
                    setUser('');
                    setEmail('');
                    setPwd('');
                    setMatchPwd('');
                })
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }
    

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="./login">Sign In</a>
                    </p>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">
                            Username:
                            {validName && <FontAwesomeIcon icon={faCheck} className="valid" />}
                            {!validName && user && <FontAwesomeIcon icon={faTimes} className="invalid" />}
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? "instructions hint" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span className="hint-text">
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, and hyphens are allowed.
                            </span>
                        </p>

                        <label htmlFor="email"> {/* New label for email */}
                            Email:
                            {validEmail && <FontAwesomeIcon icon={faCheck} className="valid" />}
                            {!validEmail && email && <FontAwesomeIcon icon={faTimes} className="invalid" />}
                        </label>
                        <input
                            type="email" // Use type email for email input
                            id="email"
                            ref={emailRef} // Reference for email field
                            autoComplete="off"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                            aria-invalid={validEmail ? "false" : "true"}
                            aria-describedby="emailnote"
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                        />
                        <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions hint" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span className="hint-text">
                                Please enter a valid email address.
                            </span>
                        </p>

                        <label htmlFor="password">
                            Password:
                            {validPwd && <FontAwesomeIcon icon={faCheck} className="valid" />}
                            {!validPwd && pwd && <FontAwesomeIcon icon={faTimes} className="invalid" />}
                        </label>

                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions hint" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span className="hint-text">
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number, and a special character.<br />
                                Allowed special characters: ! @ # $ %
                            </span>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            {(validMatch && matchPwd) && <FontAwesomeIcon icon={faCheck} className="valid" />}
                            {(!validMatch && matchPwd) && <FontAwesomeIcon icon={faTimes} className="invalid" />}
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions hint" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            <span className="hint-text">
                                Must match the first password input field.
                            </span>
                        </p>

                        <button disabled={!validName || !validEmail || !validPwd || !validMatch} type="submit">Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="/login">Sign In</a>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Register;