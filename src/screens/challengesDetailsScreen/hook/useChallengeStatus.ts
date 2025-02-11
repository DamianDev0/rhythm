import {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';

import {NotificationRequest} from '../../../../core/domain/entities/notification/request/notificationRequest';
import {NotificationController} from '../../../../core/infrastructure/controllers/notification.controller';
import {CustomToast} from '../../../components/toastComponent';
import useNavigation from '../../../hook/useNavigation';
import {finishChallenge, startChallenge} from '../../../redux/actions/actions';
import {RootState} from '../../../redux/store';

export const useChallengeStatus = (
  challengeId: string,
  imageSource: any,
  title: string,
) => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.token.userId);
  const oneSignalPlayerId = useSelector(
    (state: RootState) => state.token.oneSignalPlayerId,
  );
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

  const sendNotification = async () => {
    if (!oneSignalPlayerId) {
      console.warn('No OneSignal ID found for the user.');
      return;
    }

    const notificationData: NotificationRequest = {
      title: 'New Challenge 🎯',
      message: `You started the challenge: ${title}! 🚀`,
      oneSignalIds: [oneSignalPlayerId],
    };

    try {
      const response = await NotificationController.SendMessage(
        notificationData,
      );
      console.log('Notification sent:', response);
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

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
          text2: 'You finished this challenge',
          position: 'top',
        });
      } else {
        dispatch(startChallenge({id: challengeId, imageSource, title, userId}));
        await sendNotification();
        navigation.navigate('Home');
        CustomToast({
          type: 'success',
          text1: 'Success',
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
