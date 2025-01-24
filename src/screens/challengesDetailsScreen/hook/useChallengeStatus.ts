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
  const userId = useSelector((state: RootState) => state.token.userId);
  const challengesInProgress = useSelector(
    (state: RootState) => state.challenge.challengesInProgress,
  );
  const [isChallengeInProgress, setIsChallengeInProgress] = useState(false);

  useEffect(() => {
    if (userId) {
      const challengeInProgress = challengesInProgress.some(
        challenge =>
          challenge.id === challengeId && challenge.userId === userId,
      );
      setIsChallengeInProgress(challengeInProgress);
    }
  }, [challengesInProgress, challengeId, userId]);

  const toggleChallengeStatus = () => {
    if (!userId) {
      return;
    }
    if (isChallengeInProgress) {
      dispatch(finishChallenge({challengeId, userId}));
    } else {
      dispatch(startChallenge({id: challengeId, imageSource, title, userId}));
    }
    setIsChallengeInProgress(!isChallengeInProgress);
  };

  return {isChallengeInProgress, toggleChallengeStatus};
};
