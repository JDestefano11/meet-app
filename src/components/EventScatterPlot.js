import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const EventScatterPlot = ({ data }) => {
    return (
        <div>
            <h2>Events by Location</h2>
            <ResponsiveContainer width="99%" height={400}>
                <ScatterChart
                    margin={{ top: 20, right: 20, bottom: 60, left: 20 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        type="category" 
                        dataKey="location" 
                        name="Location" 
                        angle={45} 
                        textAnchor="start"
                        interval={0}
                        height={80}
                    />
                    <YAxis 
                        type="number" 
                        dataKey="count" 
                        name="Number of Events"
                        label={{ value: 'Number of Events', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                        cursor={{ strokeDasharray: '3 3' }}
                        formatter={(value, name, props) => [value, props.payload.location]}
                        labelFormatter={() => ''}
                    />
                    <Legend />
                    <Scatter 
                        name="Events per Location" 
                        data={data} 
                        fill="#8884d8"
                        shape="circle"
                        strokeWidth={1}
                        stroke="#8884d8"
                    />
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EventScatterPlot;
