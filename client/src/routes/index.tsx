import { Switch } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import WalletRoute from "./WalletRoute";
// pages
import { 
  Home, 
  Nft, 
  Artist, 
  MapBox, 
  Payment,  
  Signup, 
  Signin, 
  Login,
  Logout,
  PinCreate,
  PinSuccess,
  KeyPhraseSave,
  KeyConfirm,
  KeyManagement,
  KeyRecovery,
  Welcome,
  Active,
  PhotoView,
  UploadTags,
  UploadDelay,
  UploadConfirm,
  UploadArchive,
  CameraHome,
  Success,
  Setting,
  UpdatePin,
  WifiTesting,
  Recovery,
  RecoveryView,
  UpdatePinSuccess,
  SelfDestructPin,
  SelfDestructPinSuccess,
  SelfDestruct,
  Advanced,
  Adverts, 
  AdvertDetail, 
  AdvertEdit, 
  AdvertCreate, 
  ScreenEdit, 
  Screens, 
  ScreenDetail, 
  ScreenPlayer,
  UserProfile,
  Wallet,
  ScreenDashboard,
  CampaignDashboard,
  UserDashboard,
  PleaBucket,
  GalleryView,
  GalleryDetail,
  IPFS,
  Page404,
  CampaignCreator
} from "pages";

// ui
import { Stack } from "@chakra-ui/react";
import { AppLayout } from "components/layouts";

export const Routes = () => {
  return (
    // <Stack bgGradient="linear-gradient(to bottom, #ffffff, #7833B620)">
    <Stack bgColor=""> 

      <Switch>
        <PublicRoute exact path="/" component={Home} layout={AppLayout} />
        <PublicRoute exact path="/nft/:id" component={Nft} layout={AppLayout} />
        <PublicRoute exact path="/artist/:id" component={Artist} layout={AppLayout} />
        <PrivateRoute exact path="/mapbox/:pinId?" component={MapBox} layout={AppLayout} />
        <PublicRoute exact path="/signin" component={Signin} layout={AppLayout} />
        <PublicRoute exact path="/signup" component={Signup} layout={AppLayout} />

        <PrivateRoute exact path="/login" component={Login} layout={AppLayout} />
        <PublicRoute exact path="/logout" component={Logout} layout={AppLayout} />

        <PublicRoute exact path="/welcome" component={Welcome} layout={AppLayout} />
        <PrivateRoute exact path="/pin-create" component={PinCreate} layout={AppLayout} />
        <PrivateRoute exact path="/pin-success" component={PinSuccess} layout={AppLayout} />
        <PrivateRoute exact path="/key-recovery" component={KeyRecovery} layout={AppLayout} />
        <PrivateRoute exact path="/key-confirm" component={KeyConfirm} layout={AppLayout} />
        <PrivateRoute exact path="/key-phrase-save" component={KeyPhraseSave} layout={AppLayout} />
        <PrivateRoute exact path="/key-management" component={KeyManagement} layout={AppLayout} />

        <PublicRoute exact path="/ipfs" component={IPFS} layout={AppLayout} />
        <PrivateRoute exact path="/upload" component={Active} layout={AppLayout} />
        <WalletRoute exact path="/upload-photos" component={PhotoView} layout={AppLayout} />
        <WalletRoute exact path="/upload-tags" component={UploadTags} layout={AppLayout} />
        <WalletRoute exact path="/upload-delay" component={UploadDelay} layout={AppLayout} />
        <WalletRoute exact path="/upload-confirm" component={UploadConfirm} layout={AppLayout} />
        <WalletRoute exact path="/upload-success" component={Success} layout={AppLayout} />
        <WalletRoute exact path="/upload-archive" component={UploadArchive} layout={AppLayout} />
        <PrivateRoute exact path="/upload-camera" component={CameraHome} layout={AppLayout} />

        <PrivateRoute exact path="/setting" component={Setting} layout={AppLayout} />
        <WalletRoute exact path="/setting/advanced" component={Advanced} layout={AppLayout} />
        <WalletRoute exact path="/setting/update-pin" component={UpdatePin} layout={AppLayout} />
        <WalletRoute exact path="/setting/wifi-test" component={WifiTesting} layout={AppLayout} />
        <WalletRoute exact path="/setting/recovery" component={Recovery} layout={AppLayout} />
        <WalletRoute exact path="/setting/phrase-view" component={RecoveryView} layout={AppLayout} />
        <WalletRoute exact path="/setting/update-pin-success" component={UpdatePinSuccess} layout={AppLayout} />
        <WalletRoute exact path="/setting/self-destruct-pin" component={SelfDestructPin} layout={AppLayout} />
        <WalletRoute exact path="/setting/self-destruct-pin-success" component={SelfDestructPinSuccess} layout={AppLayout} />
        <WalletRoute exact path="/setting/self-destruct" component={SelfDestruct} layout={AppLayout} />

        {/* <WalletRoute exact path="/gallery" component={GalleryView} layout={AppLayout} />
        <WalletRoute exact path="/gallery-detail" component={GalleryDetail} layout={AppLayout} /> */}


        <PublicRoute exact path="/screens" component={Screens} layout={AppLayout} />
        <PrivateRoute exact path="/screen/:id/:txId?/:gameId?" component={ScreenDetail} layout={AppLayout} />
        <PrivateRoute exact path="/edit/screen/:id" component={ScreenEdit} layout={AppLayout} />
        <PublicRoute exact path="/myscreen/play/:id" component={ScreenPlayer} />
        <PublicRoute exact path="/edit_campaign/" component={CampaignCreator} layout={AppLayout}/>


        <PublicRoute exact path="/adverts" component={Adverts} layout={AppLayout} />
        <PrivateRoute exact path="/advert/:id/:txId?/:screenId?" component={AdvertDetail} layout={AppLayout} />
        <PrivateRoute exact path="/createCampaign/:screenId/:walletAddress" component={AdvertCreate} layout={AppLayout} />
        <PrivateRoute exact path="/editAdvert/:id/:txId?/:screenId?" component={AdvertEdit} layout={AppLayout} />

        <PrivateRoute exact path="/campaign/payment/:walletAddress" component={Payment} layout={AppLayout} />
        <PrivateRoute exact path="/userProfile/:id?" component={UserProfile} layout={AppLayout} />
        <PrivateRoute exact path="/wallet/:id?" component={Wallet} layout={AppLayout} />

        <PrivateRoute exact path="/dashboard/screen/:id" component={ScreenDashboard} layout={AppLayout} />
        <PrivateRoute exact path="/dashboard/user/:id" component={UserDashboard} layout={AppLayout} />
        <PrivateRoute exact path="/dashboard/campaign/:id?/:txId?" component={CampaignDashboard} layout={AppLayout} />

        <PrivateRoute exact path="/pleaBucket" component={PleaBucket} layout={AppLayout} />


        <PublicRoute exact path="*" component={Page404} layout={AppLayout} />

      </Switch>
    </Stack>
  );
};
