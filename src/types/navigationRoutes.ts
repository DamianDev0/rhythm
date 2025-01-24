export type NavigationRoutes = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Onboarding: undefined;
  HomeTab: undefined;
  Screen1: undefined;
  Screen2: undefined;
  Challenges: undefined;
  ChallengesDetails: {
    id: string;
    imageSource: string;
    title: string;
    description: string;
    timeline: {time: string; title: string; description: string}[];
  };
  HabitDetails: {
    id: number;
    name: string;
    description: string;
    image: string;
    streak: number;
    lastCompleted: string;
  };
};

//   export type AllRoutes = NavigationRoutes & TabRoutes;
