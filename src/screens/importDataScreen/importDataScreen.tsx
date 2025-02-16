import React from 'react';

import {View, Button, ActivityIndicator, StyleSheet} from 'react-native';

import useExportHabits from './hooks/useExportData';
import useImportHabits from './hooks/useImportData';

const ImportDataScreen = () => {
  const {exportHabits, loading: exportLoading} = useExportHabits();
  const {importHabits, loading: importLoading} = useImportHabits();

  return (
    <View style={styles.container}>
      <Button title="📤 Export Habits" onPress={exportHabits} />

      {exportLoading && (
        <ActivityIndicator size="large" color="blue" style={styles.loader} />
      )}

      <Button title="📥 Import Habits" onPress={importHabits} />

      {importLoading && (
        <ActivityIndicator size="large" color="green" style={styles.loader} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    gap: 30,
  },
  loader: {
    marginTop: 10,
  },
  filePath: {
    marginTop: 10,
    fontSize: 12,
    color: '#555',
  },
});

export default ImportDataScreen;
