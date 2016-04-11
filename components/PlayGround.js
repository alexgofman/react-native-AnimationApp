const React = require('react-native');
const Dimensions = require('Dimensions');

// Destructured syntax, make sure you include the Animated and Easing API
const {
  Component,
  StyleSheet,
  Animated,
  Text,
  Easing,
  TouchableOpacity,
  View
} = React;

// Again, get the width and height of the page
const {
  width,
  height
} = Dimensions.get('window');

// Create the dimension for the circle (width: 40, height: 40, border radius: 20)
const CIRCLE_DIMENSIONS = 40;

// Set the configuration for our animation timing
const TIMING_CONFIG = {
  duration: 300, // Last for 300 ms
  delay: 0, // 0 ms delay
  easing: Easing.in(Easing.ease) //  Use the Easing API here
}

// Create the PlayGround component
class Playground extends Component {
  constructor (props) {
    // Flow down the props
    super(props)

    // Set the initial state of the PlayGround
    this.state = {
      previewOpen: false,
      w: new Animated.Value(CIRCLE_DIMENSIONS),
      h: new Animated.Value(CIRCLE_DIMENSIONS),
      br: new Animated.Value(CIRCLE_DIMENSIONS/2)
    }

    // Again, we have to bind to provide the context (this) to the _triggerAnimation function
    this._triggerAnimation = this._triggerAnimation.bind(this)

  }

  // @params: w1, h1, br1, w2, h2, br2 : Integer
  _triggerAnimation (w1, h1, br1, w2, h2, br2) {
    // Set preview state
    this.setState({
      previewOpen: !this.state.previewOpen
    })

     // Start the sequence. Notice how it takes an array of animations. Everything in here will happen sequentially (FIFO)
    Animated.sequence([
      // Parallel also takes an array of animations. These animations will happen in parallel
      Animated.parallel([
        // From the initial width (40), we will move it to the new width
        Animated.timing(this.state.w, {
          ...TIMING_CONFIG,
          toValue: w1
        }),
        // From the initial height (40), we will move it to the new height
        Animated.timing(this.state.h, {
          ...TIMING_CONFIG,
          toValue: h1
        }),
        // From the initial borderRadius (20), we will move it to the new borderRadius
        Animated.timing(this.state.br, {
          ...TIMING_CONFIG,
          toValue: br1
        })
      ]),
      Animated.parallel([
        Animated.timing(this.state.w, {
          ...TIMING_CONFIG,
          toValue: w2
        }),
        Animated.timing(this.state.h, {
          ...TIMING_CONFIG,
          toValue: h2
        }),
        Animated.timing(this.state.br, {
          ...TIMING_CONFIG,
          toValue: br2
        })
      ])
    ]).start()
  }
  // This is a part of the component lifecycle. When the component mounts onto the page, it'll run this algorithm
  componentDidMount () {
    this._triggerAnimation(width, width, width/2, width, height, 0)
  }

  // When the close button is clicked, run this closing animation
  _closePreview () {
    this._triggerAnimation(width, width, width/2, CIRCLE_DIMENSIONS, CIRCLE_DIMENSIONS, CIRCLE_DIMENSIONS/2)
  }

  // Returns the current style of the element. We will plug this method directly into the element
  getStyle () {
    return [
      styles.circle,
      {
        width: this.state.w,
        height: this.state.h,
        borderRadius: this.state.br
      }
    ]
  }
  // The one essential function. This will render the view
  render () {
    let CloseButton

    if (this.state.previewOpen) {
       CloseButton =
          <TouchableOpacity onPress={this._closePreview.bind(this)} style={styles.closeButton}>
            <Text>Close me</Text>
          </TouchableOpacity>
    }

    return (
      <View style={styles.container}>
        <Animated.View
          style={this.getStyle()} />
          { CloseButton }
      </View>
    )
  }
}

// Nothing new, provide styles for the component
const styles = {
  container: {
    flex: 1
  },
  circle: {
    backgroundColor: 'darkgreen'
  },
  closeButton: {
    paddingVertical: 10,
    paddingHorizontal: 65,
    backgroundColor: 'red',
    position: 'absolute',
    top: 20,
    left: 0,
  }
}

// Export it for use in the PageOne Component
module.exports = Playground;
