import { createReducer } from '@reduxjs/toolkit';
import moment from 'moment';
import { finishChallenge, startChallenge } from './actions/actions';

interface ChallengeState {
  challengesInProgress: { id: string; startDate: string; imageSource: any; title: string; userId: string }[];
}

const initialState: ChallengeState = {
  challengesInProgress: [],
};

const challengeReducer = createReducer(initialState, builder => {
  builder.addCase(startChallenge, (state, action) => {
    state.challengesInProgress.push({
      id: action.payload.id,
      startDate: moment().format(),
      imageSource: action.payload.imageSource,
      title: action.payload.title,
      userId: action.payload.userId,
    });
  });

  builder.addCase(finishChallenge, (state, action) => {
    state.challengesInProgress = state.challengesInProgress.filter(
      challenge => challenge.id !== action.payload.challengeId || challenge.userId !== action.payload.userId
    );
  });
});

export default challengeReducer;
