import { capitalizedFirstChar, convertRating } from '../../utils/helpers';
import { TOfferCard } from '../../types/offer-card';

type TOfferDescription = {
  offer: TOfferCard;
}

export default function OfferDescription({ offer }: TOfferDescription): JSX.Element {
  const { isPremium, title, isFavorite, rating, goods, type, bedrooms, maxAdults, price, host, description} = offer;
  const { isPro, name, avatarUrl } = host;

  return (
    <>
      {
        isPremium &&
          <div className="offer__mark">
            <span>Premium</span>
          </div>
      }

      <div className="offer__name-wrapper">
        <h1 className="offer__name">
          {title}
        </h1>
        <button className="offer__bookmark-button button" type="button">
          <svg className="offer__bookmark-icon" width="31" height="33">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>
          <span className="visually-hidden">{`${isFavorite ? 'In' : 'To'} bookmarks`}</span>
        </button>
      </div>

      <div className="offer__rating rating">
        <div className="offer__stars rating__stars">
          <span style={{width: convertRating(rating)}}></span>
          <span className="visually-hidden">Rating</span>
        </div>
        <span className="offer__rating-value rating__value">{rating}</span>
      </div>

      <ul className="offer__features">
        <li className="offer__feature offer__feature--entire">
          {capitalizedFirstChar(type)}
        </li>
        <li className="offer__feature offer__feature--bedrooms">
          {bedrooms} Bedrooms
        </li>
        <li className="offer__feature offer__feature--adults">
          Max {maxAdults} adults
        </li>
      </ul>

      <div className="offer__price">
        <b className="offer__price-value">&euro;{price}</b>
        <span className="offer__price-text">&nbsp;night</span>
      </div>

      <div className="offer__inside">
        <h2 className="offer__inside-title">What&apos;s inside</h2>
        <ul className="offer__inside-list">
          {
            goods.map((item) => (
              <li className="offer__inside-item" key={item}>
                {item}
              </li>
            ))
          }
        </ul>
      </div>

      <div className="offer__host">
        <h2 className="offer__host-title">Meet the host</h2>

        <div className="offer__host-user user">
          <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
            <img className="offer__avatar user__avatar" src={avatarUrl} width="74" height="74" alt="Host avatar" />
          </div>
          <span className="offer__user-name">
            {name}
          </span>
          {
            isPro &&
              <span className="offer__user-status">
                Pro
              </span>
          }
        </div>

        <div className="offer__description">
          <p className="offer__text">
            {description}
          </p>
        </div>
      </div>
    </>
  );
}
