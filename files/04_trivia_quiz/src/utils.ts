
// answer object type
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


export const shuffleArray = (array: any[]) => 
  [...array].sort(() => Math.random() - 0.5)

