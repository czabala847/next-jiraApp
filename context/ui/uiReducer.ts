import { UIState } from ".";

type UIActionType =
  | { type: "UI - Open Sidebar" }
  | { type: "UI - Close Sidebar" }
  | { type: "UI - Add Entry"; payload: boolean }
  | { type: "UI - StartDragging" }
  | { type: "UI - EndDragging" };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
  switch (action.type) {
    case "UI - Open Sidebar":
      return {
        ...state,
        sideMenuOpen: true,
      };

    case "UI - Close Sidebar":
      return {
        ...state,
        sideMenuOpen: false,
      };

    case "UI - Add Entry":
      return {
        ...state,
        isAddingEntry: action.payload,
      };

    case "UI - EndDragging":
      return {
        ...state,
        isDragging: false,
      };

    case "UI - StartDragging":
      return {
        ...state,
        isDragging: true,
      };

    default:
      return state;
  }
};
