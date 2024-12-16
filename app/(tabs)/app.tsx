import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

// Define types for the function inputs
interface GS1DigitalLinkParams {
  gtin: string;
  serialNumber?: string;
  lotNumber?: string;
  expirationDate?: string;
}

// A function to generate a GS1 Digital Link URL
const generateGS1DigitalLink = ({ 
  gtin, 
  serialNumber, 
  lotNumber, 
  expirationDate 
}: GS1DigitalLinkParams): string => {
  const baseUrl = "https://id.gs1.org";
  const gtinIdentifier = `/01/${gtin}`; // GTIN with GS1 Application Identifier 01
  const serialIdentifier = serialNumber ? `/21/${serialNumber}` : ""; // Serial Number with AI 21
  const lotIdentifier = lotNumber ? `/10/${lotNumber}` : ""; // Lot/Batch Number with AI 10
  const expirationIdentifier = expirationDate ? `/17/${expirationDate}` : ""; // Expiration Date with AI 17

  // Combine parts into a GS1 Digital Link
  return `${baseUrl}${gtinIdentifier}${serialIdentifier}${lotIdentifier}${expirationIdentifier}`;
};

const App: React.FC = () => {
  // Example data
  const gtin = "01234567891234"; // GTIN
  const serialNumber = "12345"; // Serial number
  const lotNumber = "ABC123"; // Lot/Batch number
  const expirationDate = "240630"; // Expiration date in YYMMDD format

  // Generate the GS1 Digital Link URL
  const gs1DigitalLink = generateGS1DigitalLink({ 
    gtin, 
    serialNumber, 
    lotNumber, 
    expirationDate 
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GS1 Digital Link QR Code</Text>
      <QRCode
        value={gs1DigitalLink}
        size={200}
      />
      <Text style={styles.link}>{gs1DigitalLink}</Text>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  link: {
    marginTop: 20,
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
});

export default App;
