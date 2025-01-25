import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Map from '../../components/map/map';
import OfferGallery from '../../components/offer-gallery/offer-gallery';
import OfferDescription from '../../components/offer-description/offer-description';
import OfferReviews from '../../components/offer-reviews/offer-reviews';
import OfferNearPlacesList from '../../components/offer-near-places-list/offer-near-places-list';
import NotFoundPage from '../not-found-page/not-found-page';
import { LogoType, MapType, PageType } from '../../utils/consts';
import Loading from '../../components/spinner/spinner';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { fetchOfferAction, fetchNearbyAction, fetchReviewsAction } from '../../store/api-actions';
import { useAppSelector } from '../../hooks/use-app-selector';
import { changeCardId } from '../../store/places/places.slice';
import { selectOffer, selectOfferLoadingStatus } from '../../store/offer/offer.selectors';
import { selectReviews, selectReviewsLoadingStatus } from '../../store/reviews/reviews.selectors';
import { selectNearby, selectNearbyLoadingStatus } from '../../store/nearby/nearby.selectros';

export default function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const offer = useAppSelector(selectOffer);
  const reviews = useAppSelector(selectReviews);
  const offerNearbyPlaces = useAppSelector(selectNearby) ?? [];

  const isOfferLoading = useAppSelector(selectOfferLoadingStatus);
  const isNearbyLoading = useAppSelector(selectNearbyLoadingStatus);
  const isReviewsLoading = useAppSelector(selectReviewsLoadingStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchNearbyAction(id));
      dispatch(fetchReviewsAction(id));
    }

    return () => {
      dispatch(changeCardId(null));
    };
  }, [id, dispatch]
  );

  if (isOfferLoading || isNearbyLoading || isReviewsLoading) {
    return <Loading />;
  }

  if (!offer) {
    return <NotFoundPage />;
  }

  return (
    <div className="page">
      <Helmet>
        <title>6 cities - Offer</title>
      </Helmet>

      <Header
        logoType={LogoType.Header}
      />

      <main className="page__main page__main--offer">
        <section className="offer">
          <OfferGallery images={offer.images} />

          <div className="offer__container container">
            <div className="offer__wrapper">

              <OfferDescription offer={offer} />
              <OfferReviews reviews={reviews} />
            </div>
          </div>

          <Map
            cityPlaceCards={offerNearbyPlaces}
            currentOfferCard={offer}
            mapType={MapType.Offer}
          />
        </section>

        <div className="container">
          <OfferNearPlacesList
            offerNearbyPlaces={offerNearbyPlaces}
            pageType={PageType.Offer}
          />
        </div>
      </main>
    </div>
  );
}
