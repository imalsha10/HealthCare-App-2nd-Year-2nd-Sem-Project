import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});

const Report = ({ users }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>All Users Report</Text>
        <View>
          {users.map((user, index) => (
            <View key={index}>
              <Text>Name: {user.name}</Text>
              <Text>Number: {user.number}</Text>
              <Text>Email: {user.email}</Text>
              <Text>Province: {user.province}</Text>
              <Text>City: {user.city}</Text>
              <Text>Address: {user.address}</Text>
            </View>
          ))}
        </View>
      </View>
    </Page>
  </Document>
);

export default Report;

