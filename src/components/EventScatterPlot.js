import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const EventScatterPlot = ({ data }) => {
    return (
        <ScatterChart
            width={800}
            height={400}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
            <CartesianGrid />
            <XAxis type="category" dataKey="location" name="Location" />
            <YAxis type="number" dataKey="count" name="Number of Events" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="Events" data={data} fill="#8884d8" />
        </ScatterChart>
    );
};

export default EventScatterPlot;
