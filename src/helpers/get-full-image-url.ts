const getFullImageUrl = (partialUrl?: string) => {
  return `${process.env.REACT_APP_IMAGE_PREFIX}${partialUrl}`;
};

export default getFullImageUrl;
