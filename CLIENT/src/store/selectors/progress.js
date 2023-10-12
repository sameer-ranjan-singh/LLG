import {selector} from "recoil";
import { progressState } from "../atoms/progress"; 

export const isProgressLoading = selector({
  key: 'isProgressLoadingKey',
  get: ({get}) => {
    const state = get(progressState);

    return state.isLoading;
  },
});

export const progressSelector = selector({
  key: 'progressKey',
  get: ({get}) => {
    const state = get(progressState);
    
    return state.progress;  
},
});

export const progressIdSelector = selector({
  key: 'progressIdKey',
  get: ({get}) => {
    const state = get(progressState);
    if (state.progress) {
        return state.progress._id;
    }
    return "";
  },
});

export const userIdSelector = selector({
  key: 'userIdKey',
  get: ({get}) => {
    const state = get(progressState);
    if (state.progress) {
        return state.progress.userId;
    }
    return "";
  },
});

export const progressInLanguageSelector = selector({
  key: 'progressInLanguageKey',
  get: ({get}) => {
    const state = get(progressState);
    if (state.progress) {
        return state.progress.language;
    }
    return "";
  },
});

export const proficiencySelector = selector({
  key: 'proficiencyKey',
  get: ({get}) => {
    const state = get(progressState);
    if (state.progress) {
        return state.progress.proficiency;
    }
    return "";
  },
});

export const levelSelector = selector({
  key: 'levelKey',
  get: ({get}) => {
    const state = get(progressState);
    if (state.progress) {
        return state.progress.level;
    }
    return "";
  },
});

export const difficultySelector = selector({
    key: 'difficultyKey',
    get: ({get}) => {
      const state = get(progressState);
      if (state.progress) {
          return state.progress.difficulty;
      }
      return "";
    },
  });

  export const solvedQuestionIdSelector = selector({
    key: 'solvedQuestionIdKey',
    get: ({get}) => {
      const state = get(progressState);
      if (state.progress) {
          return state.progress.solvedQuestionId;
      }
      return "";
    },
  });

  