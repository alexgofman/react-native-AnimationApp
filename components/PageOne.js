// Bring in React Native
const React = require('react-native');
// Bring in our layout styling
const styles = require('../stylesheets/layout');

// Destructured components
const {
  Component,
  Text,
  View,
  TouchableHighlight
} = React;

class PageOne extends Component {
  constructor(props) {
    super(props);
  }
  _handlePress() {
    // Go to page 2, simply by pushing!
    this.props.navigator.push({id: 2});
  }

  _goBack() {
    // Go to the previous page, by simply popping!
    this.props.navigator.pop();
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: 'green'}]}>
        <Text style={styles.welcome}>Page one</Text>
        <TouchableHighlight onPress={this._handlePress.bind(this)} style={styles.button}>
          <Text style={styles.welcome}>Go to page two</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this._goBack.bind(this)} style={styles.backButton}>
          <Text style={styles.welcome}>Back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}

// Export this component to be used by the parent component
module.exports = PageOne;
