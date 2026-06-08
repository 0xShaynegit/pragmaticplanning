async function fetchGoogleReviews() {
  const container = document.getElementById('review-feed');
  if (!container) return;

  try {
    const response = await fetch('/api/reviews');
    const data = await response.json();
    const reviews = data.reviews || [];

    if (!reviews.length) {
      container.innerHTML = '<p style="color:rgba(252,250,242,0.5);padding:0 2.5rem 2rem;font-size:.875rem;">No reviews available right now.</p>';
      return;
    }

    // Footer standing
    var standing = document.getElementById('footer-standing');
    if (standing && data.rating && data.userRatingCount) {
      standing.textContent = data.rating.toFixed(1) + ' ★ Google Rating · ' + data.userRatingCount + '+ Verified Reviews';
    }

    container.innerHTML = reviews.map(function(review) {
      const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
      const text = review.text && review.text.text ? review.text.text : '';
      const excerpt = text;
      const author = review.authorAttribution ? review.authorAttribution.displayName : 'Google Reviewer';
      const time = review.relativePublishTimeDescription || '';

      return '<div class="testimonial-card">' +
        '<div class="review-stars" aria-label="' + review.rating + ' out of 5 stars">' + stars + '</div>' +
        '<p class="testimonial-quote">' + excerpt + '</p>' +
        '<div class="testimonial-author">' +
          '<p class="testimonial-name">' + author + '</p>' +
          '<p class="testimonial-role">' + time + '</p>' +
        '</div>' +
      '</div>';
    }).join('');

  } catch (error) {
    container.innerHTML = '<p style="color:rgba(252,250,242,0.5);padding:0 2.5rem 2rem;font-size:.875rem;">Unable to load reviews. <a href="https://www.google.com/maps/place/Pragmatic+Planning/@-45.0684789,168.7525786,17z/data=!3m1!4b1!4m6!3m5!1s0xa9d51d837b4bcb6b:0xf83b2fdb84dd5613!8m2!3d-45.0684789!4d168.7525786!16s%2Fg%2F11bytysvtr?hl=en-AU&entry=ttu&g_ep=EgoyMDI2MDYwMS4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener" style="color:#FCFAF2;">View on Google.</a></p>';
  }
}

document.addEventListener('DOMContentLoaded', fetchGoogleReviews);
