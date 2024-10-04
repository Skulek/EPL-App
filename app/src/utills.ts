export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(navigator.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };