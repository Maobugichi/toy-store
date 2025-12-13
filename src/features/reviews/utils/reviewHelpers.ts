export const formatReviewDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  const datePart = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  
  return `${datePart} at ${timePart}`;
};