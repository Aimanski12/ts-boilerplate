import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard'
import {fetchQuizQuestions, QuestionState, Difficulty} from './API'
import {GlobalStyle, Wrapper } from './App.styles'
import {AnswerObject} from './utils'


const Total_Questions = 10

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState(0)
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(true)

  const startTrivia = async () => {
    setLoading(true)
    setGameOver(false)
    
    const newQuestions = await fetchQuizQuestions(
      Total_Questions, 
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0)
    setUserAnswers([])
    setNumber(0)
    setLoading(false)
  }


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver) {
      // get user answer
      const answer = e.currentTarget.value;
      // checek answer against correct value
      const correct = questions[number].correct_answer === answer
      // add scoreif answer is correct
      if (correct) setScore(prev => prev + 1)
      // save answer in the array for user answer
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject])
    }
  }


  const nextQuestion = () => {
    //move on to the next question
    const nextQuestion = number + 1;
    if(nextQuestion === Total_Questions) {
      setGameOver(true)
    } else {
      setNumber(nextQuestion)
    }
  }


  

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>Trivia Quiz</h1>

      { gameOver || userAnswers.length === Total_Questions ? (
        <button className='start' onClick={startTrivia}>Start</button>
        ) : null}

      { !gameOver ? 
        <p className='score'>Score: {score}</p> : null }
        
      {loading ? 
        <p>Loading Questions ...</p> : null }

      {!loading && !gameOver && (
        <QuestionCard 
          answers={questions[number].answers}
          callBack={checkAnswer}
          question={questions[number].question}
          questionNum={number + 1}
          totalQuestions={Total_Questions}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
        />
      )}

      { !gameOver && !loading 
        && userAnswers.length === number + 1 && number !== Total_Questions - 1 ? 
          (<button 
            className='next' 
            onClick={nextQuestion}>
              Next Question</button>) : null }
      
    </Wrapper> 
    </>
  )
}

export default App;
