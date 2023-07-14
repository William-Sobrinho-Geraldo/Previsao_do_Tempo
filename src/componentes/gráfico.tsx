import React from 'react';
import { View } from 'react-native';
import { VictoryChart, VictoryLine, VictoryAxis, VictoryTheme } from 'victory-native';

interface LineChartProps {
  data: { x: string; y: number }[];
}

const GraficoLinha: React.FC<LineChartProps> = ({ data }) => {
  return (
    <View>
      <VictoryChart 
      theme={VictoryTheme.material} >
        {/* <VictoryAxis /> */}
        <VictoryLine data={data} x="x" y="y"
                />
      </VictoryChart>
    </View>
  );
};


export default GraficoLinha;

