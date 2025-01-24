import { createAction } from '@reduxjs/toolkit';

interface StartChallengePayload {
  id: string;
  imageSource: any;
  title: string;
  userId: string;
}

interface FinishChallengePayload {
  challengeId: string;
  userId: string;
}

export const startChallenge = createAction<StartChallengePayload>('START_CHALLENGE');
export const finishChallenge = createAction<FinishChallengePayload >('FINISH_CHALLENGE');
