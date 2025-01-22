import { createAction } from '@reduxjs/toolkit';

interface StartChallengePayload {
  id: string;
  imageSource: any;
  title: string;
}

export const startChallenge = createAction<StartChallengePayload>('START_CHALLENGE');
export const finishChallenge = createAction<string>('FINISH_CHALLENGE');
