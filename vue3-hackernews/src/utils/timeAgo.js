export default (timestamp) => {
  const diff = Date.now() / 1000 - Number(timestamp);
  if (diff < 3600) {
    return `${~~(diff / 60)} minutes ago`;
  }

  if (diff < 86400) {
    return `${~~(diff / 3600)} hours ago`;
  }

  return `${~~(diff / 86400)} days ago`;
};
