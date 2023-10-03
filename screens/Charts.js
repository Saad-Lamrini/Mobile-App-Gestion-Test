import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import React, { useLayoutEffect } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
const Charts = ({ route }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(184, 230, 249, 1)' }}>
      <View style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 34, textAlign: 'center' }}>
          Projet NRM Eliade
        </Text>
      </View>
      <View style={{ margin: 10 }}>
        <LineChart
          data={{
            labels: [
              '10/06/2023',
              '20/06/2023',
              '30/06/2023',
              '10/07/2023',
              '20/07/2023',
              '30/07/2023',
              '10/08/2023',
              '20/08/2023',
              '30/08/2023',
              '10/09/2023',
              '20/09/2023',
              '30/09/2023',
            ],
            datasets: [
              {
                data: [10, 25, 30, 70, 87, 100, 130, 150, 170, 192, 200, 210],
              },
            ],
          }}
          verticalLabelRotation={90}
          xLabelsOffset={0}
          width={Dimensions.get('window').width - 20} // from react-native
          height={450}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: '#000000',
            backgroundGradientFrom: 'black',
            backgroundGradientTo: 'rgba(86, 192, 238, 1)',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              // borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
              stroke: 'black',
            },
            verticalLabelRotation: 180,
          }}
          bezier
          style={{
            marginVertical: 8,
            //borderRadius: 16,
          }}
        />
      </View>
      <View
        style={{
          paddingTop: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
      >
        <Text
          style={{
            color: 'black',
            borderWidth: 1, // Add border width
            borderColor: 'black', // Set border color
            padding: 8, // Add padding for better appearance
            borderRadius: 5,
          }}
        >
          X_Labels: Dates
        </Text>
        <Text
          style={{
            color: 'black',
            borderWidth: 1, // Add border width
            borderColor: 'black', // Set border color
            padding: 8, // Add padding for better appearance
            borderRadius: 5,
          }}
        >
          Y_Labels: Executed Test Cases
        </Text>
      </View>
    </View>
  );
};

export default Charts;
