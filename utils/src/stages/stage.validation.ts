import { Type } from '@sinclair/typebox';
import { StageGame } from './stage';
import { ChatStageConfigData } from './chat_stage.validation';
import { RankingStageConfigData } from './ranking_stage.validation';
import { InfoStageConfigData } from './info_stage.validation';
import { PayoutStageConfigData } from './payout_stage.validation';
import { ProfileStageConfigData } from './profile_stage.validation';
import { RevealStageConfigData } from './reveal_stage.validation';
import {
  SurveyPerParticipantStageConfigData,
  SurveyStageConfigData,
} from './survey_stage.validation';
import { TransferStageConfigData } from './transfer_stage.validation';
import { TOSStageConfigData } from './tos_stage.validation';

// ************************************************************************* //
// writeExperiment, updateStageConfig endpoints                              //
// ************************************************************************* //

/** StageConfig input validation. */
export const StageConfigData = Type.Union([
  ChatStageConfigData,
  InfoStageConfigData,
  PayoutStageConfigData,
  ProfileStageConfigData,
  RankingStageConfigData,
  RevealStageConfigData,
  SurveyPerParticipantStageConfigData,
  SurveyStageConfigData,
  TOSStageConfigData,
  TransferStageConfigData,
]);

/** StageGame input validation. */
export const StageGameSchema = Type.Union([
  Type.Literal(StageGame.NONE),
  Type.Literal(StageGame.LAS),
  Type.Literal(StageGame.GCE),
  Type.Literal(StageGame.RTV),
]);

/** StageTextConfig input validation. */
export const StageTextConfigSchema = Type.Object({
  primaryText: Type.String(),
  infoText: Type.String(),
  helpText: Type.String(),
});

/** StageProgressConfig input validation. */
export const StageProgressConfigSchema = Type.Object({
  minParticipants: Type.Number(),
  waitForAllParticipants: Type.Boolean(),
  showParticipantProgress: Type.Boolean(),
});