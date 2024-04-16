export function formatTimeDate(date: Date): string {
  const now = new Date();
  const compareDate = new Date(date);
  const diffInMilliseconds = now.getTime() - compareDate.getTime();
  const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  //   const diffInDays = Math.floor(diffInHours / 24);

  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    const hours = compareDate.getHours().toString().padStart(2, "0");
    const minutes = compareDate.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    const day = compareDate.getDate().toString().padStart(2, "0");
    const month = (compareDate.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based in JavaScript
    const year = compareDate.getFullYear();
    return `${day} ${month} ${year}`;
  }
}
