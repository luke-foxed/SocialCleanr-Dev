export const parseFacebookResults = response => {
  let cleanedResults = { photos: [], text: [], site: 'facebook' };

  response.posts.data.forEach(post => {
    if (post['full_picture']) {
      cleanedResults.photos.push(post['full_picture']);
    }

    if (post['message']) {
      cleanedResults.text.push(post['message']);
    }
  });

  response.photos.data.forEach(photo => {
    cleanedResults.photos.push(photo.images.source);
  });

  return cleanedResults;
};

export const parseTwitterResults = response => {
  let cleanedResults = { photos: [], text: [], site: 'twitter' };

  response.forEach(tweet => {
    if (tweet.text) {
      cleanedResults.text.push(tweet.text);
    }

    if (tweet.extended_entities) {
      cleanedResults.photos.push(tweet.extended_entities.media[0].media_url);
    }
  });

  return cleanedResults;
};
