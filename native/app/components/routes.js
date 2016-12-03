import { StyleSheet, TabBarIOS, Text, View } from 'react-native';
import Rooms from './rooms';
import Settings from './settings';

const Master = (props) => (
  <View style={styles.component}>
    {props.children}
  </View>
);

const Routes = (
  <Router history={nativeHistory} addressBar>
    <StackRoute path="master" component={Master}>
      <Route path="/" component={Rooms} />
      <Route path="/settings" component={Settings} />
    </StackRoute>
  </Router>
)

export default Routes;
