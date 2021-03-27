const getRecipientEmail = (users, loggedInUser) =>
  users?.find(user => user !== loggedInUser?.email)

export { getRecipientEmail }
