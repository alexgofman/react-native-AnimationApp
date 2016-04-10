'use strict';

const React = require('react-native');

const Dimensions = require('Dimensions');

const {
  height,
  weight
} = Dimensions.get('window');

const {
  AppRegistry,
  StyleSheet,
  Component,
  Text,
  View,
  Navigator,
  TouchableHighlight
} = React;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
});

const BaseConfig = Navigator.SceneConfigs.FloatFromRight;

const CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: width
});

const CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A tightly wound spring will make this transition fast
  springTension: 100,
  springFriction: 1,
  // Use our custom gesture defined above
  gestures: {
    pop: CustomLeftToRightGesture
  }
});

class ReactNativeTutorial extends Component {

  // A simple switch statement to allow our router to work
  _renderScene(route, navigator) {

  }

  // Plug in the animations
  _configureScene(route) {
    return CustomSceneConfig;
  }

  render() {
    return (
      <Navigator
        initialRoute={{id: 1}}
        renderScene={this._renderScene}
        configureScene={this._configureScene}
			/>
    )
  }
}

AppRegistry.registerComponent('ReactNativeTutorial', () => ReactNativeTutorial);
