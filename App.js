import { StatusBar } from 'expo-status-bar';
import Navigation from './Navigation/Navigation';
import { RootSiblingParent } from 'react-native-root-siblings';
import { useEffect, useState } from 'react';
import { init } from './util/SQLite.Database';
import { StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import AuthContextProvider from './Store/Auth-context';

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);
  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
    }).catch(err => {
      console.log(err);
    });
  }, [])

  if (!dbInitialized) {
    return (
      <Spinner
        visible={!dbInitialized}
        textContent={'App Starting...'}
        textStyle={styles.spinnerTextStyle}
      />
    )
  }
  return (
    <RootSiblingParent>
      <StatusBar style="auto" />
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </RootSiblingParent>
  );
}
const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
});
