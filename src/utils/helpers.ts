import { PageType, LogoType, Rating, CARD_STYLES, LOGO_STYLES, MARK_STYLES, MarkType, ICON_STYLES, UrlMarker, SortOption } from './consts';
import { TTypeAs } from '../types/helper';
import { IconOptions } from 'leaflet';
import { TPlaceCard } from '../types/place-card';

export const capitalizedFirstChar = (element: string) => element.replace(element[0], element[0].toUpperCase());

export const convertRating = (rating: number) => `${Math.round(rating) * Rating.Multiplier}%`;

export const convertDate = (date: string) => new Date(date).toLocaleDateString('en-US', { month: 'long', year: 'numeric'});

export const getPlaceCardStyles = (pageType: TTypeAs<typeof PageType>) => {
  const list: (string | number)[][] = [];
  Object.entries(CARD_STYLES).forEach(([key, value]) => {
    const [main, favorites, offer] = value;
    switch (pageType) {
      case PageType.Main:
        list.push([key, main]);
        break;
      case PageType.Favorites:
        list.push([key, favorites]);
        break;
      case PageType.Offer:
        list.push([key, offer]);
        break;
    }
  });
  return Object.fromEntries(list);
};

export const getLogoStyles = (logoType: TTypeAs<typeof LogoType>) => {
  const list: (string | number)[][] = [];
  Object.entries(LOGO_STYLES).forEach(([key, value]) => {
    const [header, footer] = value;
    switch (logoType) {
      case LogoType.Header:
        list.push([key, header]);
        break;
      case LogoType.Footer:
        list.push([key, footer]);
        break;
    }
  });
  return Object.fromEntries(list);
};

export const getMarkStyles = (markType: TTypeAs<typeof MarkType>) => {
  const list: (string | number)[][] = [];
  Object.entries(MARK_STYLES).forEach(([key, value]) => {
    const [small, medium] = value;
    switch (markType) {
      case MarkType.Small:
        list.push([key, small]);
        break;
      case MarkType.Medium:
        list.push([key, medium]);
        break;
    }
  });
  return Object.fromEntries(list);
};

export const getIconStyles = (iconType: TTypeAs<typeof UrlMarker>): IconOptions => {
  const iconStyle = {iconUrl: iconType};
  Object.assign(iconStyle, ICON_STYLES);
  return iconStyle;
};

export const sortingCityPlaceCards = (places: TPlaceCard[], option: TTypeAs<typeof SortOption>) => {
  switch (option) {
    case SortOption.PriceLowToHigh:
      return places.toSorted((placeA, placeB) => placeA.price - placeB.price);
    case SortOption.PriceHighToLow:
      return places.toSorted((placeA, placeB) => placeB.price - placeA.price);
    case SortOption.TopRatedFirst:
      return places.toSorted((placeA, placeB) => placeB.rating - placeA.rating);
    default:
      return places;
  }
};
