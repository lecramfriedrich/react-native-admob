import React from 'react';
import {
  NativeModules,
  requireNativeComponent,
  View,
  NativeEventEmitter,
  ViewPropTypes
} from 'react-native';
import { string, func, style } from 'prop-types';

const RNBanner = requireNativeComponent('RNAdMobDFP', PublisherBanner);

export default class PublisherBanner extends React.Component {

  constructor() {
    super();
    this.onSizeChange = this.onSizeChange.bind(this);
    this.state = {
      style: {},
    };
  }

  onSizeChange(event) {
    const { height, width } = event.nativeEvent;
    this.setState({ style: { width, height } });
  }

  render() {
    const { adUnitID, testDeviceID, bannerSize, style, didFailToReceiveAdWithError,admobDispatchAppEvent } = this.props;
    return (
      <View style={this.props.style}>
        <RNBanner
          style={this.state.style}
          onSizeChange={this.onSizeChange.bind(this)}
          onAdViewDidReceiveAd={this.props.adViewDidReceiveAd}
          onDidFailToReceiveAdWithError={(event) => didFailToReceiveAdWithError(event.nativeEvent.error)}
          onAdViewWillPresentScreen={this.props.adViewWillPresentScreen}
          onAdViewWillDismissScreen={this.props.adViewWillDismissScreen}
          onAdViewDidDismissScreen={this.props.adViewDidDismissScreen}
          onAdViewWillLeaveApplication={this.props.adViewWillLeaveApplication}
          onAdmobDispatchAppEvent={(event) => admobDispatchAppEvent(event)}
          testDeviceID={testDeviceID}
          adUnitID={adUnitID}
          bannerSize={bannerSize} />
      </View>
    );
  }
}

PublisherBanner.propTypes = {
  style: style,

  /**
   * AdMob iOS library banner size constants
   * (https://developers.google.com/admob/ios/banner)
   * banner (320x50, Standard Banner for Phones and Tablets)
   * largeBanner (320x100, Large Banner for Phones and Tablets)
   * mediumRectangle (300x250, IAB Medium Rectangle for Phones and Tablets)
   * fullBanner (468x60, IAB Full-Size Banner for Tablets)
   * leaderboard (728x90, IAB Leaderboard for Tablets)
   * smartBannerPortrait (Screen width x 32|50|90, Smart Banner for Phones and Tablets)
   * smartBannerLandscape (Screen width x 32|50|90, Smart Banner for Phones and Tablets)
   *
   * banner is default
   */
  bannerSize: string,

  /**
   * AdMob ad unit ID
   */
  adUnitID: string,

  /**
   * Test device ID
   */
  testDeviceID: string,

  /**
   * AdMob iOS library events
   */
  adViewDidReceiveAd: func,
  didFailToReceiveAdWithError: func,
  adViewWillPresentScreen: func,
  adViewWillDismissScreen: func,
  adViewDidDismissScreen: func,
  adViewWillLeaveApplication: func,
  admobDispatchAppEvent: func,
  ...ViewPropTypes,
};

PublisherBanner.defaultProps = { bannerSize: 'smartBannerPortrait', didFailToReceiveAdWithError: () => {} ,
admobDispatchAppEvent: () => {}};
