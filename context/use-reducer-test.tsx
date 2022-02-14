import {FunctionComponent, Reducer, useReducer} from "react";

type SongStatusState =
  {
    status: 'INIT';
  }
  | {
  status: 'READY';
  currentPlayingSong: string | null;
  songIndicatorMap: Map<string,  boolean>;
}

type SongStatusAction =
  {
    type: 'SET_SONGIDS';
    songIds: string[];
  }
  | {
  type: 'TOGGLE';
  songId: string;
}

const songStatusInitial: SongStatusState = {status: 'INIT'}

const songStatusReducer: Reducer<SongStatusState, SongStatusAction> = (state: SongStatusState, action: SongStatusAction) => {
  switch (state.status) {
    case 'INIT':
      if (action.type === "SET_SONGIDS") {
        let songIndicatorMap = new Map()

        action.songIds.forEach((value) => songIndicatorMap.set(value, false))
        return {
          status: "READY",
          currentPlayingSong: null,
          songIndicatorMap
        }
      }

      break;

    case 'READY':
      if (action.type === "TOGGLE") {
        if (state.currentPlayingSong !== action.songId) {
          for (let key in state.songIndicatorMap) {
            state.songIndicatorMap.set(key, false)
          }

          state.songIndicatorMap.set(action.songId, true)
          state.currentPlayingSong = action.songId

          return {...state}
        }

        if (state.currentPlayingSong === action.songId) {
          let currentSongStatus = state.songIndicatorMap.get(action.songId)
          state.songIndicatorMap.set(action.songId, !currentSongStatus)

          return {...state}
        }
      }

      break;
  }

  throw new Error('Invalid status')
}

const MyComponent: FunctionComponent = () => {
  const [songStatusState, songStatusDispatch] = useReducer(songStatusReducer, songStatusInitial);
  return (
    <div/>
  )
};

