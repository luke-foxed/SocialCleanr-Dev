 /**
 * Extract all photos and posts from Facebook API response
 * @param {object} response - Output from API call
 * @return {object} Object containing array of photos and texts
 */

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

  response.photos.data.forEach(photoArray => {
    cleanedResults.photos.push(photoArray.images[0].source);
  });

  return cleanedResults;
};

 /**
 * Extract all photos and posts from Twitter API response
 * @param {object} response - Output from API call
 * @return {object} Object containing array of photos and texts
 */

export const parseTwitterResults = response => {
  let cleanedResults = { photos: [], text: [], site: 'twitter' };

  response.forEach(tweet => {
    if (tweet.text) {
      cleanedResults.text.push(tweet.text);
    }

    if (tweet.extended_entities) {
      // ignore video thumbnails
      if (
        tweet.extended_entities.media[0].media_url.indexOf(
          'ext_tw_video_thumb'
        ) === -1
      ) {
        cleanedResults.photos.push(tweet.extended_entities.media[0].media_url);
      }
    }
  });

  return cleanedResults;
};
