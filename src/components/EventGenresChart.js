import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// EventGenresChart component to display a pie chart of event genres
const EventGenresChart = ({ events }) => {
    // State to hold the data for the pie chart
    const [data, setData] = useState([]);

    // Array of genres to be displayed in the pie chart
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

    // Function to get the data for the pie chart
    const getData = () => {
        // Map over the genres array to create data for the pie chart
        const data = genres.map(genre => {
            // Filter events that include the current genre in their summary
            const filteredEvents = events.filter(event => event.summary.includes(genre));
            // Return an object with the genre name and the count of events for that genre
            return {
                name: genre,
                value: filteredEvents.length
            };
        });
        return data;
    };

    // useEffect to update the data state when the events prop changes
    useEffect(() => {
        setData(getData());
    }, [events]);

    // Function to render customized labels for the pie chart
    const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius;
        const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.07;
        const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.07;
        return percent ? (
            <text
                x={x}
                y={y}
                fill="#8884d8"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
            >
                {`${genres[index]} ${(percent * 100).toFixed(0)}%`}
            </text>
        ) : null;
    };

    // Array of colors for the pie slices
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384'];

    return (
        <div>
            <h2>Event Genres Chart</h2>
            <ResponsiveContainer width="99%" height={400}>
                <PieChart>
                    <Pie
                        data={data} // Data for the pie chart
                        dataKey="value" // Key to determine the value of each slice
                        fill="#8884d8" // Default fill color
                        labelLine={false} // Disable label lines
                        label={renderCustomizedLabel} // Custom label function
                        outerRadius={150} // Outer radius of the pie chart
                    >
                        {/* Map over the data to create a Cell for each slice with a different color */}
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip /> {/* Tooltip to show data on hover */}
                    <Legend /> {/* Legend to show the genres */}
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default EventGenresChart;
