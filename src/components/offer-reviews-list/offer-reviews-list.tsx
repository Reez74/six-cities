import Rating from '../rating/rating';
import { Comment, RatingType } from '../../utils/consts';
import { convertDate } from '../../utils/helpers';
import { TUserReview } from '../../types/user';

type TOfferReviewsListProps = {
  reviews: TUserReview[];
}

export default function OfferReviewsList({ reviews }: TOfferReviewsListProps): JSX.Element {
  const reviewsSorted = reviews
    .slice(Comment.MinCount, Comment.MaxCount)
    .toSorted((reviewA, reviewB) => Date.parse(reviewB.date) - Date.parse(reviewA.date));

  return (
    <ul className="reviews__list">
      {
        reviewsSorted.slice(Comment.MinCount, Comment.MaxCount).map(({ id, user, rating, comment, date }) => (
          <li className="reviews__item" key={id}>
            <div className="reviews__user user">
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt="Reviews avatar" />
              </div>
              <span className="reviews__user-name">
                {user.name}
              </span>
            </div>

            <div className="reviews__info">
              <Rating
                type={RatingType.Reviews}
                rating={rating}
              />

              <p className="reviews__text">
                {comment}
              </p>
              <time className="reviews__time" dateTime={date}>{convertDate(date)}</time>
            </div>
          </li>
        ))
      }
    </ul>
  );
}
