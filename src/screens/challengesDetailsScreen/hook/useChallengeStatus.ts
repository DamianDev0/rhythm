import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {finishChallenge, startChallenge} from '../../../redux/actions/actions';

export const useChallengeStatus = (
  challengeId: string,
  imageSource: any,
  title: string,
) => {
  const dispatch = useDispatch();
  const challengesInProgress = useSelector(
    (state: RootState) => state.challenge.challengesInProgress,
  );
  const [isChallengeInProgress, setIsChallengeInProgress] = useState(false);

  useEffect(() => {
    const challengeInProgress = challengesInProgress.some(
      challenge => challenge.id === challengeId,
    );
    setIsChallengeInProgress(challengeInProgress);
  }, [challengesInProgress, challengeId]);

  const toggleChallengeStatus = () => {
    if (isChallengeInProgress) {
      dispatch(finishChallenge(challengeId));
    } else {
      dispatch(startChallenge({id: challengeId, imageSource, title}));
    }
    setIsChallengeInProgress(!isChallengeInProgress);
  };

  return {isChallengeInProgress, toggleChallengeStatus};
};
