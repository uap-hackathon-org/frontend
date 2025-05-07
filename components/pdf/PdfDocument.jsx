import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const pageStyle = {
  paddingTop: 16,
  paddingHorizontal: 40,
  paddingBottom: 56
};

const tableStyle = {
  display: "table",
  width: "auto",
  marginTop : 10
};

const tableRowStyle = {
  flexDirection: "row",
  height : 100
};

const tableRowStyle2 = {
  flexDirection: "row",
  height : 50
};

const firstTableColHeaderStyle = {
  width: "30%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  backgroundColor: "#bdbdbd"
};


const tableColHeaderStyle2 = {
  width: "70%",
  borderStyle: "solid",
  borderColor: "#000",
  borderBottomColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  backgroundColor: "#bdbdbd"
};

const firstTableColStyle = {
  width: "30%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderTopWidth: 0
};

const tableColStyle2 = {
  width: "70%",
  borderStyle: "solid",
  borderColor: "#000",
  borderWidth: 1,
  borderLeftWidth: 0,
  borderTopWidth: 0
};

const tableCellHeaderStyle = {
  textAlign: "center",
  margin: 4,
  fontSize: 12,
  fontWeight: "bold"
};

const tableCellStyle = {
  textAlign: "start",
  margin: 5,
  fontSize: 10
};

const createTableHeader = () => {
  return (
    <View style={tableRowStyle2} fixed>

      <View style={firstTableColHeaderStyle}>
        <Text style={tableCellHeaderStyle}>Place Name</Text>
      </View>

      <View style={tableColHeaderStyle2}>
        <Text style={tableCellHeaderStyle}>Instruction</Text>
      </View>

    </View>
  );
};

const createTableRow = (plan) => {
  return (
    <View style={tableRowStyle}>

      <View style={firstTableColStyle}>
        <Text style={tableCellStyle}>{plan.name}</Text>
      </View>

      <View style={tableColStyle2}>
        <Text style={tableCellStyle}> Best Time To Visit : {plan.best_time_to_visit}</Text>
        <Text style={tableCellStyle}> Entry Fee : {plan.entry_fee}</Text>
        <Text style={tableCellStyle}> Description : {plan.description}</Text>
      </View>

    </View>
  );
};

function PdfDocument({ plan }) {
  return (
    <Document>
      <Page
        style={pageStyle}
        size="A4"
        orientation="portrait">
        <View>
          <Text style={{ fontSize : 24, color : "#333", textAlign : "center" }}>Tour Plan</Text>
        </View>
        <View style={tableStyle}>
          {createTableHeader()}
          {
            plan.map(p => createTableRow(p))
          }
        </View>
      </Page>
    </Document>
  );
}

export default PdfDocument;