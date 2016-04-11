const React = require('react-native')

// Bring in the Animated API
const {
  StyleSheet,
  Animated,
  Component,
  View,
  Text,
  TouchableWithoutFeedback
}  = React

// Set a timing for the button press
const ACTION_TIMER = 400
// Set the colors you want the button to turn into
const COLORS = ['rgb(0,0,255)', 'rgb(111,235,62)']

// Create the Gestures component
class Gestures extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pressAction: new Animated.Value(0), // Default the value to 0
      textComplete: '',
      buttonWidth: 0,
      buttonHeight: 0
    }
    // Bind the context to animationActionComplete
    this.animationActionComplete = this.animationActionComplete.bind(this)
  }

  // When the button is pressed, run this code
  handlePressIn () {
    // We will run the animation until it turns to 1
    Animated.timing(this.state.pressAction, {
      duration: ACTION_TIMER,
      toValue: 1
    }).start(this.animationActionComplete)
    // After the animation finishes, run the animationActionComplete method
  }

  // When the user doesn't hold on to the button, turn the value back towards 0
  handlePressOut () {
    Animated.timing(this.state.pressAction, {
      duration: this.state.pressAction.__getAnimatedValue() * ACTION_TIMER,
      toValue: 0
    }).start(this.animationActionComplete)
  }

  // Shows a customized message
  animationActionComplete () {
    let message = ''
    if (this.state.pressAction.__getAnimatedValue() === 1) {
      message = "Thank you for holding :-)"
    } else {
      message = 'Press and hold the button!'
    }

    this.setState({
      textComplete: message
    })
  }
  // Get the width & height of the button
  getButtonWidthLayout (e) {
    this.setState({
      buttonWidth: e.nativeEvent.layout.width - 6,
      buttonHeight: e.nativeEvent.layout.height - 6
    })
  }

  // Like the getStyle method in the previous example, we will return the style of the button
  getProgressStyles () {
    // Map the range of our inputs to the width
    let width = this.state.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.buttonWidth]
    })
    // Map the range of inputs to the colors
    let bgColor = this.state.pressAction.interpolate({
      inputRange: [0, 1],
      outputRange: COLORS
    })

    return {
      width: width,
      height: this.state.buttonHeight,
      backgroundColor: bgColor
    }
  }

  render () {
    return (
      <View style={styles.container}>
        {/* When users press or unpress this, run the methods */}
        <TouchableWithoutFeedback
          onPressIn={this.handlePressIn.bind(this)}
          onPressOut={this.handlePressOut.bind(this)}
          >
          {/* A static button, which will provide the width when rendered */}
          <View style={styles.button} onLayout={this.getButtonWidthLayout.bind(this)}>
            <Animated.View style={[styles.bgFill, this.getProgressStyles()]} />
            <Text style={styles.text}>Press me!</Text>
          </View>
        </TouchableWithoutFeedback>
        <View>
          {/* Show the customized message */}
          <Text>{this.state.textComplete}</Text>
        </View>
      </View>
    )
  }

}

// Provide basic styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    padding: 10,
    borderWidth: 3,
    borderColor: '#111'
  },
  text: {
    backgroundColor: 'transparent',
    color: '#111'
  },
  bgFill: {
    position: 'absolute',
    top: 0,
    left: 0
  }
})

module.exports = Gestures;
