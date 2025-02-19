export type NavigationRoutes = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  Onboarding: undefined;
  HomeTab: undefined;
  Habits: undefined;
  Chart: undefined;
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
    frequency: string;
    time: string
  };
  ImportDataScreen: undefined;
};

//   export type AllRoutes = NavigationRoutes & TabRoutes;
