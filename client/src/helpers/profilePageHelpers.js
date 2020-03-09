export const parseFacebookResults = response => {
  let cleanedResults = { photos: [], text: [], site: 'facebook' };

  response.posts.data.forEach(post => {
    if (post['picture']) {
      cleanedResults.photos.push(post['picture']);
    }

    if (post['message']) {
      cleanedResults.text.push(post['message']);
    }
  });

  return cleanedResults;
};
