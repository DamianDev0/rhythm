import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {finishChallenge, startChallenge} from '../../../redux/actions/actions';
import useNavigation from '../../../hook/useNavigation';
import {CustomToast} from '../../../components/toastComponent';

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
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (userId) {
      const challengeInProgress = challengesInProgress.some(
        challenge =>
          challenge.id === challengeId && challenge.userId === userId,
      );
      setIsChallengeInProgress(challengeInProgress);
    }
  }, [challengesInProgress, challengeId, userId]);

  const toggleChallengeStatus = async () => {
    if (!userId) {
      return;
    }
    setLoading(true);
    try {
      if (isChallengeInProgress) {
        dispatch(finishChallenge({challengeId, userId}));
        navigation.navigate('Home');
        CustomToast({
          type: 'info',
          text1: 'Info',
          text2: 'You finish this challenge',
          position: 'top',
        });
      } else {
        dispatch(startChallenge({id: challengeId, imageSource, title, userId}));
        navigation.navigate('Home');
        CustomToast({
          type: 'success',
          text1: 'success',
          text2: 'You started a new challenge',
          position: 'top',
        });
      }
      setIsChallengeInProgress(!isChallengeInProgress);
    } finally {
      setLoading(false);
    }
  };

  return {isChallengeInProgress, toggleChallengeStatus, loading};
};
