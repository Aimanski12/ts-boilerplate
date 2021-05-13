import React from 'react'
import {AnswerObject} from '../utils'

import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

type Props = {
  answers: string[];
  callBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
  question: string;
  questionNum: number;
  totalQuestions: number
  userAnswer: AnswerObject | undefined;
}

const QuestionCard: React.FC<Props> = ({
  answers, 
  callBack, 
  question, 
  questionNum, 
  totalQuestions,
  userAnswer
}) => (
  <Wrapper>
    <p className='number'>
      Question: {questionNum} / {totalQuestions}
    </p>
    <p dangerouslySetInnerHTML={{__html: question}} />
    <div>
      {answers.map(answer => (
        <ButtonWrapper  key={answer}
          correct={userAnswer?.correctAnswer === answer}
          userClicked={userAnswer?.answer === answer}>
          <button disabled={userAnswer ? true : false} value={answer} onClick={callBack}>
            <span dangerouslySetInnerHTML={{__html: answer}}></span>
          </button>
        </ButtonWrapper>
      ))}
    </div>

    
  </Wrapper>
)

export default QuestionCard
