import React from 'react';
import { View } from 'react-native';
import { VictoryChart, VictoryLine } from 'victory-native';

interface LineChartProps {
  data: { x: number; y: number }[];
}

const GraficoLinha: React.FC<LineChartProps> = ({ data }) => {
  return (
    <View>
      <VictoryChart>
        <VictoryLine data={data} x="x" y="y" />
      </VictoryChart>
    </View>
  );
};


export default GraficoLinha;

