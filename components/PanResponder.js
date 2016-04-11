const React = require('react-native')

// Remember to load in the PanResponder Library!
const {
  Component,
  StyleSheet,
  Animated,
  Text,
  View,
  PanResponder,
  TouchableWithoutFeedback
} = React;

// Set the square dimensions to be 40 by 40
const SQUARE_DIMENSIONS = 40

// Create the PanResponderAPI Component
class PanResponderAPI extends Component {
  constructor (props) {
    super(props)

     // We will be dealing with the X and Y coordinate of the square, so set the value to Animated.ValueXY
    this.state = {
      pan: new Animated.ValueXY()
    }

    // Bind functions
    this.getStyle = this.getStyle.bind(this)
  }

  // Before the component is mounted to the page, lets work with our PanResponder Library
  componentWillMount () {
    // Ask to be the responder for our app. Make sure we say true
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      // The gesture has now started. Show the offset on the page!
      onPanResponderGrant: (evt, gestureState) => {
        // The guesture has started. Grab the values of where the square is moving to
        // what is happening!
        this.state.pan.setOffset({
          x: this.state.pan.x.__getAnimatedValue(),
          y: this.state.pan.y.__getAnimatedValue()
        })
        // Default value of the square
        this.state.pan.setValue({
          x: 0,
          y: 0
        })

        // gestureState.{x,y}0 will be set to zero now
      },
      // Input the coordinates
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x,
          dy: this.state.pan.y
        }
      ]),
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // The user has released all touches while this view is the
        // responder. This typically means a gesture has succeeded
        Animated.spring(this.state.pan, {
          toValue: 0
        }).start()
      }
    })
  }
  // This method will go into the animated component
  getStyle () {
    return [
      styles.square,
      {
        transform: [
          {
            translateX: this.state.pan.x
          },
          {
            translateY: this.state.pan.y
          }
        ]
      }
    ]
  }

  render () {
    return (
      <View style={styles.container}>
        <Animated.View style={this.getStyle()} {...this._panResponder.panHandlers} />
      </View>
    )
  }
}

// Basic styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  square: {
    width: SQUARE_DIMENSIONS,
    height: SQUARE_DIMENSIONS,
    backgroundColor: 'yellow'
  }
})

// Export the component to be used in PageThree
module.exports = PanResponderAPI
