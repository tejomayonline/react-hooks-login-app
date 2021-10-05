import React, { useContext, useReducer } from "react";
import AuthContext from "../../context/auth-context";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";

const formInitialState = {
  email: {
    value: "",
    isValid: null,
  },
  password: {
    value: "",
    isValid: null,
  },
  isValid: null,
};

const formReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "USER_INPUT_EMAIL":
      newState = {
        ...state,
        email: {
          value: action.value,
          isValid: action.value.includes("@"),
        },
      };
      break;
    case "USER_INPUT_PASSWORD":
      newState = {
        ...state,
        password: {
          value: action.value,
          isValid: action.value.trim().length > 6,
        },
      };
      break;
    case "ON_BLUR_EMAIL":
      newState = {
        ...state,
        email: {
          ...state.email,
          isValid: state.email.value.includes("@"),
        },
      };
      break;
    case "ON_BLUR_PASSWORD":
      newState = {
        ...state,
        password: {
          ...state.password,
          isValid: state.password.value.trim().length > 6,
        },
      };
      break;
    default:
      newState = formInitialState;
  }
  newState.isValid = newState.email.isValid && newState.password.isValid;
  return newState;
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [formIsValid, setFormIsValid] = useState(false);

  const [formState, dispatchFormAction] = useReducer(
    formReducer,
    formInitialState
  );
  const authContext = useContext(AuthContext);
  console.log("Login", authContext);

  // useEffect(() => {
  //   const timout = setTimeout(() => {}, 500);
  //   return () => {
  //     clearTimeout(timout);
  //   };
  // }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    dispatchFormAction({
      type: "USER_INPUT_EMAIL",
      value: event.target.value,
    });
    // setFormIsValid(
    //   event.target.value.includes("@") && enteredPassword.trim().length > 6
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchFormAction({
      type: "USER_INPUT_PASSWORD",
      value: event.target.value,
    });
    // setFormIsValid(
    //   enteredEmail.includes("@") && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchFormAction({
      type: "ON_BLUR_EMAIL",
    });
  };

  const validatePasswordHandler = () => {
    dispatchFormAction({
      type: "ON_BLUR_PASSWORD",
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(formState.email.value, formState.password.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            formState.email.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            autoComplete="off"
            value={formState.email.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            formState.password.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            autoComplete="off"
            value={formState.password.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button
            type="submit"
            className={classes.btn}
            disabled={!formState.isValid}
          >
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
