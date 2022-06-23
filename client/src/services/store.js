// reducer store
import { 
  createStore, 
  compose, 
  applyMiddleware, 
  combineReducers 
} from 'redux';

import thunk from 'redux-thunk';

import { 
  bucketReducer, 
} from '../Reducers/bucketReducers';

// import {
//   channelCategoryListReducer,
//   channelCreateReducer,
//   channelDeleteReducer,
//   channelDetailsReducer,
//   channelSubscribeReducer,
//   channelFilmDeleteReducer,
//   channelFilmsReducer,
//   channelFilmUploadReducer,
//   channelLikeReducer,
//   channelListReducer,
//   channelReviewCreateReducer,
//   channelUnsubscribeReducer,
//   channelUnlikeReducer,
//   channelUpdateReducer,
//   channelFlagReducer,
//   channelParamsReducer,
// } from '../src/Reducers/channelReducers';

// import {
//   filmDeleteReducer,
//   filmDetailsReducer,
//   filmLikeReducer,
//   filmListAllReducer,
//   filmReviewReducer,
//   filmUnlikeReducer,
//   filmUpdateReducer,
//   filmViewReducer,
//   filmParamsReducer,
//   filmFlagReducer
// } from '../src/Reducers/filmReducers';

// import {
//   itemDeleteReducer,
//   itemDetailReducer,
//   itemLikeReducer,
//   itemListAllReducer,
//   itemReviewReducer,
//   itemUnlikeReducer,
//   itemUpdateReducer,
//   itemViewReducer
// } from '../src/Reducers/itemReducers';

import {
  masterRequestReducer,
  allyRequestReducer,
  brandRequestReducer,
  allPleasListReducer,
  pleaSummaryReducer
} from '../Reducers/pleaReducers'

import { 
  pinAddReducer, 
  pinUpdateReducer,
  pinsGetReducer,
  jsonPinsReducer,
  pinDetailsReducer 
} from '../Reducers/pinReducers';

// import {
//   assetCategoryListReducer,
//   assetCreateReducer,
//   assetScreenCreateReducer,
//   assetDetailsReducer,
//   assetLikeReducer,
//   assetListReducer,
//   assetReviewCreateReducer,
//   assetDeleteReducer,
//   assetUnlikeReducer,
//   assetFlagReducer,
//   assetUpdateReducer,
//   assetScreensReducer,
//   assetParamsReducer,
// } from '../src/Reducers/assetReducers';

import {
  screenAllyPleaRequestReducer,
  screenAllyPleaGrantReducer,
  screenAllyPleaRejectReducer,
  screenCategoryListReducer,
  screenCreateReducer,
  screenDetailsReducer,
  screenPinDetailsReducer,
  screenLikeReducer,
  screenListReducer,
  screenReviewCreateReducer,
  screenSubscribeReducer,
  screenDeleteReducer,
  screenUnlikeReducer,
  screenFlagReducer,
  screenUnsubscribeReducer,
  screenUpdateReducer,
  screenVideoDeleteReducer,
  screenVideosReducer,
  screenVideoUploadReducer,
  screenLocationMapReducer,
  screenParamsReducer,
} from '../Reducers/screenReducers';

// import {
//   shopParamsReducer,
//   shopCategoryListReducer,
//   shopCreateReducer,
//   shopDeleteReducer,
//   shopDetailsReducer,
//   shopItemDeleteReducer,
//   shopItemsReducer,
//   shopItemUploadReducer,
//   shopLikeReducer,
//   shopListReducer,
//   shopReviewCreateReducer,
//   shopFlagReducer,
//   shopUnlikeReducer,
//   shopUpdateReducer,
//   shopPinDetailsReducer,

// } from '../src/Reducers/shopReducers';

import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userTopMasterListReducer,
  userSigninReducer,
  userSignupReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
  userAssetsReducer,
  userScreensReducer,
  userVideosReducer,
  userTopAllyListReducer,
  userChannelsReducer,
  userFilmsReducer,
  userTopBrandListReducer,
  userShopsReducer,
  userItemsReducer
} from '../Reducers/userReducers';

import {
  videoReviewReducer,
  videoDeleteReducer,
  videoDetailsReducer,
  videoLikeReducer,
  videoListAllReducer,
  videoUpdateReducer,
  videoViewReducer,
  videoUnlikeReducer,
  videoUploadReducer,
  videoParamsReducer,
  videoFlagReducer,
} from '../Reducers/videoReducers';

import { 
  tokensTransferReducer,
  walletCreateReducer, 
  walletDetailsReducer, 
  walletEditReducer, 
  walletListReducer,
  userAtomicNftUploadReducer 
} from '../Reducers/walletReducers';

import { 
  screenCalenderReducer,
  calenderDataAddReducer,
  slotBookingReducer,
  calenderDaySlotBookReducer,
  dayBookingReducer,
} from '../Reducers/calenderReducers';

import { 
  screenGameCreateReducer,
  screenGameRemoveReducer, 
  screenGameDetailsReducer,
  screenGamePlayReducer,
  assetGameCreateReducer,
  assetGameRemoveReducer, 
  assetGameDetailsReducer,
  assetGamePlayReducer,
  advertGameCreateReducer,
  advertGameRemoveReducer,
  advertGameDetailsReducer,
  advertGamePlayReducer,
  channelGameCreateReducer,
  channelGameRemoveReducer,
  channelGameDetailsReducer,
  channelGamePlayReducer,
  filmGameCreateReducer,
  filmGameRemoveReducer,
  filmGameDetailsReducer,
  filmGamePlayReducer,
  shopGameCreateReducer,
  shopGameRemoveReducer,
  shopGameDetailsReducer,
  shopGamePlayReducer,
  itemGameCreateReducer,
  itemGameRemoveReducer,
  itemGameDetailsReducer,
  itemGamePlayReducer,
} from '../Reducers/gameReducers';



const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  walletDetails: {
    wallet: localStorage.getItem('wallet')
      ? JSON.parse(localStorage.getItem('wallet'))
      : null,
  }
};

const reducer = combineReducers({
  // assetList: assetListReducer,
  // assetDetails: assetDetailsReducer,
  // assetCreate: assetCreateReducer,
  // assetScreenCreate: assetScreenCreateReducer,
  // assetUpdate: assetUpdateReducer,
  // assetDelete: assetDeleteReducer,
  // assetCategoryList: assetCategoryListReducer,
  // assetReviewCreate: assetReviewCreateReducer,
  // assetScreens: assetScreensReducer,
  // assetLike: assetLikeReducer,
  // assetUnlike: assetUnlikeReducer,
  // assetFlag: assetFlagReducer,
  // assetParams: assetParamsReducer,
  
  screenList: screenListReducer,
  screenDetails: screenDetailsReducer,
  screenPinDetails: screenPinDetailsReducer,
  screenCreate: screenCreateReducer,
  screenUpdate: screenUpdateReducer,
  screenDelete: screenDeleteReducer,
  screenCategoryList: screenCategoryListReducer,
  screenReviewCreate: screenReviewCreateReducer,
  screenVideos: screenVideosReducer,
  screenVideoUpload: screenVideoUploadReducer,
  screenVideoDelete: screenVideoDeleteReducer,
  screenLike: screenLikeReducer,
  screenUnlike: screenUnlikeReducer,
  screenFlag: screenFlagReducer,
  screenSubscribe: screenSubscribeReducer,
  screenUnsubscribe: screenUnsubscribeReducer,
  screenLocationMap: screenLocationMapReducer,
  screenAllyPleaRequest: screenAllyPleaRequestReducer,
  screenAllyPleaGrant: screenAllyPleaGrantReducer,
  screenAllyPleaReject: screenAllyPleaRejectReducer,
  screenParams: screenParamsReducer,
  
  // channelList: channelListReducer,
  // channelDetails: channelDetailsReducer,
  // channelCreate: channelCreateReducer,
  // channelUpdate: channelUpdateReducer,
  // channelDelete: channelDeleteReducer,
  // channelCategoryList: channelCategoryListReducer,
  // channelReviewCreate: channelReviewCreateReducer,
  // channelFilms: channelFilmsReducer,
  // channelFilmUpload: channelFilmUploadReducer,
  // channelFilmDelete: channelFilmDeleteReducer,
  // channelLike: channelLikeReducer,
  // channelUnlike: channelUnlikeReducer,
  // channelSubscribe: channelSubscribeReducer,
  // channelUnsubscribe: channelUnsubscribeReducer,
  // channelFlag: channelFlagReducer,
  // channelParams: channelParamsReducer,

  // shopList: shopListReducer,
  // shopDetails: shopDetailsReducer,
  // shopCreate: shopCreateReducer,
  // shopUpdate: shopUpdateReducer,
  // shopDelete: shopDeleteReducer,
  // shopCategoryList: shopCategoryListReducer,
  // shopReviewCreate: shopReviewCreateReducer,
  // shopItems: shopItemsReducer,
  // shopItemUpload: shopItemUploadReducer,
  // shopItemDelete: shopItemDeleteReducer,
  // shopLike: shopLikeReducer,
  // shopUnlike: shopUnlikeReducer,
  // shopFlag: shopFlagReducer,
  // shopParams: shopParamsReducer,
  // shopPinDetails: shopPinDetailsReducer,


  bucket: bucketReducer,
  masterRequest: masterRequestReducer,
  allyRequest: allyRequestReducer,
  brandRequest: brandRequestReducer,
  allPleasList: allPleasListReducer,
  pleaSummary: pleaSummaryReducer,
  
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userTopMastersList: userTopMasterListReducer,
  userTopAlliesList: userTopAllyListReducer,
  userTopBrandsList: userTopBrandListReducer,
  userAssets: userAssetsReducer,
  userScreens: userScreensReducer,
  userVideos: userVideosReducer,
  userChannels: userChannelsReducer,
  userFilms: userFilmsReducer,
  userShops: userShopsReducer,
  userItems: userItemsReducer,

  videoListAll: videoListAllReducer,
  videoDetails: videoDetailsReducer,
  videoUpload: videoUploadReducer,
  videoDelete: videoDeleteReducer,
  videoLike: videoLikeReducer,
  videoUnlike: videoUnlikeReducer,
  videoView: videoViewReducer,
  videoReview: videoReviewReducer,
  videoUpdate: videoUpdateReducer,
  videoParams: videoParamsReducer,
  videoFlag: videoFlagReducer,

  // filmListAll: filmListAllReducer,
  // filmDetails: filmDetailsReducer,
  // filmDelete: filmDeleteReducer,
  // filmLike: filmLikeReducer,
  // filmUnlike: filmUnlikeReducer,
  // filmView: filmViewReducer,
  // filmReview: filmReviewReducer,
  // filmUpdate: filmUpdateReducer,
  // filmParams: filmParamsReducer,
  // filmFlag: filmFlagReducer,

  // itemListAll: itemListAllReducer,
  // itemDetail: itemDetailReducer,
  // itemDelete: itemDeleteReducer,
  // itemLike: itemLikeReducer,
  // itemUnlike: itemUnlikeReducer,
  // itemView: itemViewReducer,
  // itemReview: itemReviewReducer,
  // itemUpdate: itemUpdateReducer,

  pinsGet: pinsGetReducer,
  pinAdd: pinAddReducer,
  pinUpdate: pinUpdateReducer,
  jsonPins: jsonPinsReducer,
  pinDetails: pinDetailsReducer, 

  walletCreate: walletCreateReducer,
  walletDetails: walletDetailsReducer,
  walletList: walletListReducer,
  walletEdit: walletEditReducer,
  tokensTransfer: tokensTransferReducer,
  userAtomicNftUpload: userAtomicNftUploadReducer,

  screenCalender: screenCalenderReducer,
  calenderDataAdd: calenderDataAddReducer,
  slotBooking: slotBookingReducer,
  calenderDaySlotBook: calenderDaySlotBookReducer,
  dayBooking: dayBookingReducer,

  screenGameCreate: screenGameCreateReducer,
  screenGameRemove: screenGameRemoveReducer,
  screenGameDetails: screenGameDetailsReducer,
  screenGamePlay: screenGamePlayReducer,
  // assetGameCreate: assetGameCreateReducer,
  // assetGameRemove: assetGameRemoveReducer,
  // assetGameDetails: assetGameDetailsReducer,
  // assetGamePlay: assetGamePlayReducer,
  advertGameCreate: advertGameCreateReducer,
  advertGameRemove: advertGameRemoveReducer,
  advertGameDetails: advertGameDetailsReducer,
  advertGamePlay: advertGamePlayReducer,
  // channelGameCreate: channelGameCreateReducer,
  // channelGameRemove: channelGameRemoveReducer,
  // channelGameDetails: channelGameDetailsReducer,
  // channelGamePlay: channelGamePlayReducer,
  // filmGameCreate: filmGameCreateReducer,
  // filmGameRemove: filmGameRemoveReducer,
  // filmGameDetails: filmGameDetailsReducer,
  // filmGamePlay: filmGamePlayReducer,
  // shopGameCreate: shopGameCreateReducer,
  // shopGameRemove: shopGameRemoveReducer,
  // shopGameDetails: shopGameDetailsReducer,
  // shopGamePlay: shopGamePlayReducer,
  // itemGameCreate: itemGameCreateReducer,
  // itemGameRemove: itemGameRemoveReducer,
  // itemGameDetails: itemGameDetailsReducer,
  // itemGamePlay: itemGamePlayReducer,
});


const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;