// import { ContentAction, ContentState } from "./index.types";

// export function contentReducer(
//   state: ContentState,
//   action: ContentAction
// ): ContentState {
//   switch (action.type) {
//     case "INIT_CONTENT_LIST": {
//       return {
//         ...state,
//         contentList: {
//           ...state.contentList,
//           data: action.payload.contentList,
//           contentListQuery: action.payload.contentListQuery,
//           pinnedContent: action.payload.contentList.filter(
//             (content) => content.pinned
//           ),
//         },
//       };
//     }
//     case "INIT_CONTENT": {
//       return {
//         ...state,
//         content: {
//           ...state.content,
//           data: action.payload.content,
//           contentQuery: action.payload.contentQuery,
//         },
//       };
//     }
//     case "SELECT_CONTENT": {
//       return {
//         ...state,
//         contentList: {
//           ...state.contentList,
//           selectedContent: [
//             ...state.contentList.selectedContent,
//             action.payload,
//           ],
//         },
//       };
//     }
//     case "REMOVE_SELECTED_CONTENT": {
//       return {
//         ...state,
//         contentList: {
//           ...state.contentList,
//           selectedContent: state.contentList.selectedContent.filter(
//             (content) => content.id !== action.payload
//           ),
//         },
//       };
//     }
//     case "CLEAR_SELECTED_CONTENT": {
//       return {
//         ...state,
//         contentList: {
//           ...state.contentList,
//           selectedContent: [],
//         },
//       };
//     }
//     case "PREVIEW_CONTENT": {
//       return {
//         ...state,
//         contentList: {
//           ...state.contentList,
//           previewContent: action.payload,
//         },
//       };
//     }
//     case "RESET_CONTENT": {
//       return {
//         ...state,
//         content: {
//           ...state.content,
//           data: null,
//         },
//       };
//     }
//     default:
//       return state;
//   }
// }
