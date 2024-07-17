export const getModalContent = (actionType) => {
    switch (actionType) {
      case 'clear':
        return {
          title: "Clear this Board?",
          content: "Are you sure you want to clear the board? This action will remove all columns and tasks and cannot be reversed.",
          btnText: "Clear"
        };
      case 'delete':
        return {
          title: "Delete this Board?",
          content: "Are you sure you want to delete the board? This action will remove all columns and tasks and cannot be reversed.",
          btnText: "Delete"
        };
      case 'reset':
        return {
          title: "Reset this Board?",
          content: "Are you sure you want to reset all boards? This action will remove all boards, columns, tasks etc which where created by you. This action can't be reversed!",
          btnText: "Reset"
        };
      default:
        return { title: "", content: "" };
    }
  };
  