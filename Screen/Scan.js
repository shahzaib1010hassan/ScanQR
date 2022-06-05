import React, {Component, Fragment} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import styles from './ScanStyle';
import {
  TouchableOpacity,
  Text,
  StatusBar,
  Linking,
  View,
  Image,
} from 'react-native';
import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
import {RNCamera} from 'react-native-camera';
class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scan: false,
      ScanResult: false,
      result: null,
    };
  }

  onSuccess = e => {
    const check = e.data.substring(0, 4);
    console.log('scanned data' + check);
    this.setState({
      result: e,
      scan: false,
      ScanResult: true,
    });
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      this.setState({
        result: e,
        scan: false,
        ScanResult: true,
      });
    }
  };

  activeQR = () => {
    this.setState({
      scan: true,
    });
  };
  scanAgain = () => {
    this.setState({
      scan: true,
      ScanResult: false,
    });
  };
  render() {
    const {scan, ScanResult, result} = this.state;
    const desccription =
      'Just Click the Button and Scan QR in just few Seconds.';
    return (
      <View style={styles.scrollViewStyle}>
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <Image
            source={require('./scan.png')}
            style={{width: 120, height: 120, alignSelf: 'center'}}
          />
          <Text style={styles.textTitle}>Welcome To scan Me!</Text>
          {!scan && !ScanResult && (
            <View style={styles.cardView}>
              <Text numberOfLines={8} style={styles.descText}>
                {desccription}
              </Text>

              <TouchableOpacity
                onPress={this.activeQR}
                style={styles.buttonTouchable1}>
                <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
              </TouchableOpacity>
            </View>
          )}

          {ScanResult && (
            <Fragment>
              <Text style={styles.textTitle1}>Result !</Text>
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text style={{fontSize: 18}}>QR Type : {result.type}</Text>
                <Text style={{fontSize: 18}}>Result : {result.data}</Text>
                <TouchableOpacity
                  onPress={this.scanAgain}
                  style={styles.buttonTouchable}>
                  <Text style={styles.buttonTextStyle}>
                    Click to Scan again!
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}

          {scan && (
            <QRCodeScanner
              reactivate={true}
              flashMode={RNCamera.Constants.FlashMode.auto}
              showMarker={true}
              ref={node => {
                this.scanner = node;
              }}
              onRead={this.onSuccess}
              bottomContent={
                <View>
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => this.scanner.reactivate()}>
                    <Text style={styles.buttonTextStyle}>OK. Got it!</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => this.setState({scan: false})}>
                    <Text style={styles.buttonTextStyle}>Stop Scan</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          )}
        </Fragment>
      </View>
    );
  }
}

export default Scan;
