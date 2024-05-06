/** Survey question types */

import { ItemName } from './items.types';

export enum SurveyQuestionKind {
  Text = 'TextQuestion',
  Check = 'CheckQuestion',
  Rating = 'RatingQuestion',
  Scale = 'ScaleQuestion',
}

// ********************************************************************************************* //
//                                           CONFIGS                                             //
// ********************************************************************************************* //

interface BaseQuestionConfig {
  kind: SurveyQuestionKind;
  questionText: string;
}

export interface TextQuestionConfig extends BaseQuestionConfig {
  kind: SurveyQuestionKind.Text;
}

export interface CheckQuestionConfig extends BaseQuestionConfig {
  kind: SurveyQuestionKind.Check;
}

export interface RatingQuestionConfig extends BaseQuestionConfig {
  kind: SurveyQuestionKind.Rating;

  item1: ItemName;
  item2: ItemName;
}

export interface ScaleQuestionConfig extends BaseQuestionConfig {
  kind: SurveyQuestionKind.Scale;

  upperBound: string; // Description for the upper bound of the scale
  lowerBound: string; // Description for the lower bound of the scale
}

export type QuestionConfig =
  | TextQuestionConfig
  | CheckQuestionConfig
  | RatingQuestionConfig
  | ScaleQuestionConfig;

// ********************************************************************************************* //
//                                           ANSWERS                                             //
// ********************************************************************************************* //

interface BaseQuestionAnswer {
  kind: SurveyQuestionKind;
}

export interface TextQuestionAnswer extends BaseQuestionAnswer {
  kind: SurveyQuestionKind.Text;

  answerText: string | null;
}

export interface CheckQuestionAnswer extends BaseQuestionAnswer {
  kind: SurveyQuestionKind.Check;

  checkMark: boolean | null;
}

export interface RatingQuestionAnswer extends BaseQuestionAnswer {
  kind: SurveyQuestionKind.Rating;

  choice: ItemName | null;
  confidence: number | null;
}

export interface ScaleQuestionAnswer extends BaseQuestionAnswer {
  kind: SurveyQuestionKind.Scale;

  score: number | null;
}

export type QuestionAnswer =
  | TextQuestionAnswer
  | CheckQuestionAnswer
  | RatingQuestionAnswer
  | ScaleQuestionAnswer;

// ********************************************************************************************* //
//                                       DEFAULT CONFIGS                                         //
// ********************************************************************************************* //

export const getDefaultTextQuestion = (): TextQuestionConfig => {
  return {
    kind: SurveyQuestionKind.Text,
    questionText: '',
  };
};

export const getDefaultCheckQuestion = (): CheckQuestionConfig => {
  return {
    kind: SurveyQuestionKind.Check,
    questionText: '',
  };
};

export const getDefaultItemRatingsQuestion = (): RatingQuestionConfig => {
  return {
    kind: SurveyQuestionKind.Rating,
    questionText: '',
    item1: 'blanket',
    item2: 'compas',
  };
};

export const getDefaultScaleQuestion = (): ScaleQuestionConfig => {
  return {
    kind: SurveyQuestionKind.Scale,
    questionText: '',
    upperBound: '',
    lowerBound: '',
  };
};
