import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Dialog from "@material-ui/core/Dialog";
import OwnAppBar from "./OwnAppBar";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import theme from "../theme";
import quizData from "./quizData";

export default function MCQ(props) {
  const [value, setValue] = React.useState();
  const changedOption = (event) => {
    setValue(event.target.value);
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const currQuestion = {
    questionTopic: "Scale",
    questionText: "How many users will use your application?",
    answerOptions: [
      { answerText: "1-5 users", price: 9000 },
      { answerText: "6-20 users", price: 15000 },
      { answerText: "21-40 users", price: 35000 },
      { answerText: "Custom", price: 0 },
    ],
    isCompulstory: true,
    selectionType: "single-select",
  };

  const options = currQuestion.answerOptions.map(({ answerText, price }) => (
    <FormControlLabel
      value={answerText}
      control={<Radio />}
      label={answerText}
      price={price}
      onClick={() => setTotalPrice(price)}
    />
  ));

  const calculatePrice = (price) => {
    setTotalPrice(price);
  };

  const prevQuestion = () => {
    setQuestionIndex(questionIndex - 1);
  };

  const nextQuestion = () => {
    setQuestionIndex(questionIndex + 1);
  };
  return (
    <MuiThemeProvider theme={theme}>
      <>
        <OwnAppBar title />
        <Dialog open fullWidth maxWidth="md">
          <FormControl component="fieldset">
            <h2 component="legend">{currQuestion.questionTopic}</h2>
            <h3 component="legend">{currQuestion.questionText}</h3>
            <RadioGroup
              aria-label="scale"
              name="scale"
              value={value}
              onChange={changedOption}
            >
              {options}
            </RadioGroup>
          </FormControl>

          <Button color="secondary" variant="contained" onClick={prevQuestion}>
            Back
          </Button>
          <Button color="primary" variant="contained" onClick={nextQuestion}>
            Continue
          </Button>
          <p>questionIndex: {questionIndex}</p>
          <p>totalPrice: ${totalPrice}</p>
        </Dialog>
      </>
    </MuiThemeProvider>
  );
}
