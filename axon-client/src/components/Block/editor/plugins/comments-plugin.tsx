"use client";

import { CommentsPlugin } from "@udecode/plate-comments/react";

import { CommentsPopover } from "src/components/Block/plate-ui/comments-popover";

export const commentsPlugin = CommentsPlugin.configure({
  options: {
    myUserId: "1",
    users: {
      1: {
        id: "1",
        avatarUrl: "",
        name: "stephensanwo",
      },
      2: {
        id: "2",
        avatarUrl: "",
        name: "stephensanwo",
      },
    },
  },
  render: { afterEditable: () => <CommentsPopover /> },
});
